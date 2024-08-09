import { sql } from "@/internal/core";

export async function POST(request: Request) {
  const json: { userId: number } = await request.json();
  await sql`DELETE FROM account WHERE id = ${json.userId}`;
  return Response.json({ success: true });
}
