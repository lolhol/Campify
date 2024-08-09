import { Camp } from "@/interfaces/util/Camp";
import { groq, sql } from "@/internal/core";

export async function POST(request: Request) {
  const json = await request.json();
  const groqAPIResponse = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          "Please extract the key words from this string and give them in the format of an array: key1,key2,key3,... . If the words are not complete, try to predict what the user wanted to say. DO NOT SAY ANYTHING ELSE! JUST SAY THE KEYWORDS. NOTHING ELSE!\n\n" +
          json.searchString,
      },
    ],
    model: "llama3-70b-8192",
  });

  const keywords = groqAPIResponse.choices[0].message.content?.split(",") ?? [];
  console.log(keywords);

  let conditions = sql`false`;
  for (const value of keywords) {
    conditions = sql`${conditions} OR description LIKE ${"%" + value + "%"} OR name LIKE ${"%" + value + "%"}`;
  }

  const result = await sql<Camp[]>`
    SELECT * FROM camp WHERE (${conditions}) AND is_public LIMIT 10
  `;

  return Response.json({
    camps: result,
  });
}
