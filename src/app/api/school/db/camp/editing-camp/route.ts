import { sql } from "@/internal/core";
import { SaveCamp } from "@/interfaces/request/SaveCamp";
import { GetEditingCamp } from "@/interfaces/request/GetEditingCamp";

export async function POST(request: Request) {
  const json: GetEditingCamp = await request.json();
  if (!json.userId) return Response.error();

  const dbAccountRes = await sql<
    {
      editing_camp_id: number | null;
    }[]
  >`SELECT editing_camp_id FROM account WHERE id = ${json.userId};`;
  console.log(dbAccountRes[0]);
  if (!dbAccountRes[0].editing_camp_id) {
    const result = await sql<{ id: number }[]>`INSERT INTO camp 
    (
      likes,
      comments,
      description,
      name,
      image,
      short_description,
      tags,
      is_public
    )
    VALUES 
    (
       0, 
       0, 
       '',
       '',
       '',
       '',
       '',
       false
    )
    RETURNING id;`;

    console.log(result[0] + "!!!!");

    await sql`UPDATE account
              SET editing_camp_id = ${result[0].id} 
              WHERE id = ${json.userId}`;

    return Response.json({
      id: result[0].id,
      name: "",
      longDescription: "",
      shortDescription: undefined,
      image: undefined,
    });
  }

  const data = (
    await sql<
      SaveCamp[]
    >`SELECT id, name, description, short_description, image FROM camp WHERE id = ${dbAccountRes[0].editing_camp_id}`
  )[0];

  return Response.json(data);
}
