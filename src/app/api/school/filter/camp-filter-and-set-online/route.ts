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
  const commonTags = [
    "Science",
    "Gaming",
    "Adventure",
    "Art",
    "Music",
    "Sports",
    "Robotics",
    "Drama",
    "Coding",
    "Wilderness",
    "Dance",
    "Writing",
    "Film",
    "Math",
    "Chess",
    "Language",
    "Leadership",
    "Nature",
    "Yoga",
    "Horseback Riding",
    "Photography",
    "Cooking",
    "Space",
    "Survival",
    "Marine Biology",
    "Theatre",
    "Magic",
    "Pottery",
    "Fitness",
    "Circus",
    "Sailing",
    "History",
    "STEM",
    "Ecology",
    "Design",
    "Astronomy",
    "Crafts",
    "Environmental",
    "Archery",
    "Animal Care",
    "Aquatics",
    "Baking",
    "Basketball",
    "Beach",
    "Bible",
    "Biology",
    "Birdwatching",
    "Board Game",
    "Book Club",
    "Boy Scout",
    "Camping Skills",
    "Canoeing",
    "Career Exploration",
    "Ceramics",
    "Cheerleading",
    "Chemistry",
    "Christian",
    "Climbing",
    "Color Guard",
    "Community Service",
    "Computer",
    "Creative Writing",
    "Cricket",
    "Cross Country",
    "CrossFit",
    "Cultural",
    "Cycling",
    "Dance Fitness",
    "Debate",
    "Dodgeball",
    "Drama Performance",
    "Drawing",
    "Entrepreneurship",
    "ESL",
    "Fashion",
    "Fencing",
    "Field Hockey",
    "Figure Skating",
    "Fishing",
    "Flag Football",
    "Floral Design",
    "Football",
    "French",
    "Gardening",
    "Geology",
    "Golf",
    "Guitar",
    "Gymnastics",
    "Handball",
    "Hiking",
    "Hockey",
    "Home Economics",
    "Ice Skating",
    "Judo",
    "Karate",
    "Kayaking",
    "Kite Flying",
    "Knitting",
    "Lacrosse",
    "Lego",
    "Literature",
    "Magic Performance",
    "Mandarin",
    "Martial Arts",
    "Meditation",
    "Minecraft",
    "Model UN",
    "Mountain Biking",
    "Mountaineering",
    "Multisport",
    "Museum",
    "Music Production",
    "Nature Photography",
    "Outdoor Adventure",
    "Outdoor Skills",
    "Painting",
    "Parkour",
    "Piano",
    "Public Speaking",
    "Quilting",
    "Racing",
    "Racket Sports",
    "Rappelling",
    "Recycling",
    "Roller Skating",
    "Rugby",
    "Sailing Skills",
    "Scouting",
    "Screenwriting",
    "Sculpture",
    "Sewing",
    "Skiing",
    "Skydiving",
    "Snowboarding",
    "Soccer",
    "Softball",
    "Songwriting",
    "Speech",
    "STEM Robotics",
    "Storytelling",
    "Surfing",
    "Swimming",
    "Table Tennis",
    "Taekwondo",
    "Tennis",
    "Track and Field",
    "Triathlon",
    "Ultimate Frisbee",
    "Underwater Robotics",
    "Veterinary Science",
    "Video Game Design",
    "Violin",
    "Volleyball",
    "Wakeboarding",
  ];

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
