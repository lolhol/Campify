import { Camp } from "@/interfaces/util/Camp";
import { sql } from "@/internal/core";
import {
  handleChatGPTFilter,
  handleProfanityFilter,
} from "../filter-functions";

export async function POST(request: Request) {
  const json: {
    campId: string;
    userId: string;
  } = await request.json();

  const dbResult = await sql<Camp[]>`
    SELECT id, likes, comments, description, name, image, tags
    FROM camp
    WHERE id = ${json.campId}
  `;

  let profane = true;
  if (
    !(await handleProfanityFilter(dbResult[0].name)).isProfanity &&
    !(await handleProfanityFilter(dbResult[0].description)).isProfanity &&
    (await handleChatGPTFilter(dbResult[0].description)) != 100 &&
    (await handleChatGPTFilter(dbResult[0].name)) != 100
  ) {
    if (dbResult[0].short_description) {
      if (
        !(await handleProfanityFilter(dbResult[0].short_description))
          .isProfanity &&
        (await handleChatGPTFilter(dbResult[0].short_description)) != 100
      ) {
        profane = false;
      }
    } else {
      profane = false;
    }
  }

  if (!profane) {
    await sql`UPDATE camp
    SET is_public = true
    WHERE id = ${json.campId}`;

    await sql`UPDATE account
    SET editing_camp_id = null
    WHERE id = ${json.userId}`;
  }

  return Response.json({
    profane: profane,
  });
}
