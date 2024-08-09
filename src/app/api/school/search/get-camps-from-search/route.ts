import { Camp } from "@/interfaces/util/Camp";
import { groq, sql } from "@/internal/core";

export async function POST(request: Request) {
  const json: { searchString: string } = await request.json();

  // Extract words and tags from the search string
  const searchWords: string[] = [];
  const tags: string[] = [];
  const words = json.searchString.toLowerCase().split(/\s+/); // Convert to lowercase

  for (const word of words) {
    if (word.startsWith("#")) {
      tags.push(word.substring(1)); // Remove the '#' for easier searching
    } else {
      searchWords.push(word);
    }
  }

  // Construct the tsquery string for full-text search
  const tsQueryString = searchWords.map((word) => `${word}:*`).join(" & ");

  // Construct the tag conditions
  let tagCondition = sql`true`;
  if (tags.length > 0) {
    tagCondition = tags
      .map((tag) => sql`lower(tags) LIKE ${"%" + tag + "%"}`)
      .reduce((a, b) => sql`${a} AND ${b}`);
  }

  // SQL query with full-text search across multiple columns, tag filtering, and ranking
  const result = await sql<Camp[]>`
    SELECT 
      id,
      likes,
      comments,
      description,
      name,
      image,
      short_description,
      is_public,
      tags,
      ts_rank_cd(
        setweight(to_tsvector('english', lower(coalesce(name, ''))), 'A') ||
        setweight(to_tsvector('english', lower(coalesce(description, ''))), 'B') ||
        setweight(to_tsvector('english', lower(coalesce(short_description, ''))), 'C'),
        to_tsquery('english', ${tsQueryString})
      ) AS rank
    FROM camp
    WHERE 
      (${tags.length > 0 ? tagCondition : sql`true`})
      ${
        searchWords.length > 0
          ? sql`
        AND (
          setweight(to_tsvector('english', lower(coalesce(name, ''))), 'A') ||
          setweight(to_tsvector('english', lower(coalesce(description, ''))), 'B') ||
          setweight(to_tsvector('english', lower(coalesce(short_description, ''))), 'C')
        ) @@ to_tsquery('english', ${tsQueryString})
      `
          : sql``
      }
      AND is_public
    ORDER BY rank DESC
    LIMIT 10
  `;

  return Response.json({
    camps: result,
  });
}
