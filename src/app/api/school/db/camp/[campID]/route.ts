import { sql } from "@/internal/core";
import { Camp } from "@/interfaces/util/Camp";

export async function POST(
  request: Request,
  { params }: { params: { campID: string } }
) {
  const dbResult = await sql<Camp[]>`
    SELECT id, likes, comments, description, name, image, tags
    FROM camp
    WHERE id = ${params.campID}
  `;
  return Response.json(dbResult[0]);
}
