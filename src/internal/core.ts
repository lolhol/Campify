import postgres from "postgres";
import { Liveblocks } from "@/internal/Liveblocks";
import Groq from "groq-sdk";
import { Index, type QueryResult } from "@upstash/vector";

export const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export const sql = postgres(process.env.POSTGRES_URL!);
export const liveblocks = new Liveblocks(process.env.SECRET_LIVEBLOCKS_KEY!);
export const index = new Index({
  url: process.env.UPSTASH_URL!,
  token: process.env.UPSTASH_KEY!,
});

/*
export async function loadModel(): Promise<use.UniversalSentenceEncoder> {
  return await use.load();
}

export async function getEmbedding(
  model: use.UniversalSentenceEncoder,
  text: string
): Promise<number[]> {
  const embeddings = await model.embed([text]);
  return embeddings.arraySync()[0];
}

export function cosineSimilarity(
  vecA: Float32Array,
  vecB: Float32Array
): number {
  const dotProduct = tf
    .tensor1d(vecA)
    .dot(tf.tensor1d(vecB))
    .arraySync() as number;
  const normA = tf.norm(tf.tensor1d(vecA)).arraySync() as number;
  const normB = tf.norm(tf.tensor1d(vecB)).arraySync() as number;
  return dotProduct / (normA * normB);
}*/
