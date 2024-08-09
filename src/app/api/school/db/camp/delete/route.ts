import { sql } from "@/internal/core";

export async function POST(request: Request) {
  const json: { id: number } = await request.json();
  await sql`DELETE FROM camp WHERE id = ${json.id}`;
  return Response.json({ success: true });
}
