import { groq } from "@/internal/core";
import { Camp } from "../../../../../../interfaces/util/Camp";

export async function POST(request: Request) {
  const json: {
    searchString: string;
    camps: Camp[];
  } = await request.json();
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
  const returnCamps = [];

  for (const camp of json.camps) {
    for (const keyword of keywords) {
      if (camp.description.includes(keyword) || camp.name.includes(keyword)) {
        returnCamps.push(camp);
      }
    }
  }

  return Response.json({
    camps: returnCamps,
  });
}
