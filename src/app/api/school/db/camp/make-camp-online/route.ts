import { sql } from "@/internal/core";
import { SaveCamp } from "@/interfaces/request/SaveCamp";

export async function POST(request: Request) {
  const json: SaveCamp = await request.json();
  await sql`UPDATE camp
            SET description = ${json.description}, name = ${json.name}, short_description = ${json.short_description}, image = ${json.image}, is_public = true
            WHERE id = ${json.id}`;
  return new Response();
}
