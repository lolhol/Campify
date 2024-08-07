import { groq } from "@/internal/core";

export interface ProfanityFilterAPIRes {
  isProfanity: boolean;
  score: number;
}

export async function handleChatGPTFilter(message: string) {
  const groqRes = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          "Here is a string that you should check for profanity and check if the content is not offensive in any way. Make sure that you check both for profanity and offensiveness. Then, return a score from 0 to 100. 'Great Camp! I had a lot of fun on the campus and it was awesome!'",
      },
      {
        role: "assistant",
        content: "0",
      },
      {
        role: "user",
        content:
          "Here is a string that you should check for profanity and check if the content is not offensive in any way. Make sure that you check both for profanity and offensiveness. Then, return a score from 0 to 100. 'Great Camp! I had a lot of fun on the campus and it was awesome as fuck!'",
      },
      {
        role: "assistant",
        content: "70",
      },
      {
        role: "user",
        content:
          "Here is a string that you should check for profanity and check if the content is not offensive in any way. Make sure that you check both for profanity and offensiveness. Then, return a score from 0 to 100. 'Great Camp! I had a lot of fun on the campus and it was awesome as frick!'",
      },
      {
        role: "assistant",
        content: "50",
      },
      {
        role: "user",
        content:
          "Here is a string that you should check for profanity and check if the content is not offensive in any way. Make sure that you check both for profanity and offensiveness. Then, return a score from 0 to 100. 'The string is: Fuck you bitch ass up. This stuppid camp sucks!'",
      },
      {
        role: "assistant",
        content: "100",
      },
      {
        role: "user",
        content:
          "Here is a string that you should check for profanity and check if the content is not offensive in any way. Make sure that you check both for profanity and offensiveness. Then, return a score from 0 to 100 (100 being very offensive and profane while 0 being not profane at all). The string is: " +
          message,
      },
    ],
    model: "llama3-70b-8192",
  });
  const parsed = groqRes.choices[0].message.content?.toString();
  return parsed == undefined ? -1 : parseInt(parsed);
}

export async function handleProfanityFilter(message: string) {
  const filterRes: ProfanityFilterAPIRes = await (
    await fetch("https://vector.profanity.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message,
      }),
    })
  ).json();
  return filterRes;
}
