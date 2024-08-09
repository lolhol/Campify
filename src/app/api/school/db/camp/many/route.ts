import { sql } from "@/internal/core";
import { Camp } from "@/interfaces/util/Camp";

export async function POST(request: Request) {
  return Response.json({
    camps: await sql<Camp[]>`
        SELECT
          *
        FROM
          camp
        WHERE 
            is_public = true
        LIMIT 30
    `,
  });
}
