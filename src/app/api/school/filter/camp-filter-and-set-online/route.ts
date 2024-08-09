import { Camp } from "@/interfaces/util/Camp";
import { groq, index, sql } from "@/internal/core";
import fs from "fs";
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

    const allDataString =
      dbResult[0].description +
      " " +
      dbResult[0].name +
      " " +
      dbResult[0].short_description;

    const tags = await getTags(allDataString);

    //console.log(tags);

    await sql`UPDATE camp
    SET tags = ${tags}
    WHERE id = ${json.campId}`;

    await sql`UPDATE camp SET tsv = to_tsvector('english', name || ' ' || description || ' ' || short_description) 
    WHERE id = ${json.campId}`;
  }

  return Response.json({
    profane: profane,
  });
}

async function getTags(campString: string) {
  const commonTags = fs.readFileSync("local/common-tags.json", "utf8");
  const groqOutput = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          "Having a list of common camp tags: " +
          commonTags +
          ", please choose top 5 most relevant tags for this string: " +
          campString +
          ". Make sure to give the tags in the format: <tag>,<tag>,... . MAKE SURE TO OUTPUT THE TAGS IN THAT FORMAT! DO NOT SAY ANYTHING ELSE!",
      },
    ],
    model: "llama3-70b-8192",
  });

  return groqOutput.choices[0].message.content?.split(",") ?? [];
}
