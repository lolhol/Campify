import postgres from "postgres";
import { Liveblocks } from "@/internal/Liveblocks";
import Groq from "groq-sdk";

export const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export const sql = postgres(process.env.POSTGRES_URL!);
export const liveblocks = new Liveblocks(process.env.SECRET_LIVEBLOCKS_KEY!);
