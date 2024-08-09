import { Camp } from "@/interfaces/util/Camp";
import { sql } from "@/internal/core";

export async function POST(request: Request) {
  const json = await request.json();
  let conditions = sql`false`;
  for (const value of json.tags) {
    conditions = sql`${conditions} OR tags LIKE ${"%" + value + "%"}`;
  }

  const result = await sql<Camp[]>`
      SELECT * FROM camp WHERE (${conditions}) AND is_public LIMIT 10
    `;

  return Response.json({
    camps: result,
  });
}
