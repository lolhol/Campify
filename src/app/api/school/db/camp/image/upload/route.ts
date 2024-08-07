import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { promisify } from "util";
import fs from "fs";
import { stat, mkdir, writeFile } from "fs/promises";
import path from "path";
import { sql } from "@/internal/core";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const campId = formData.get("id");
  let file = formData.get("file");

  if (!file || !campId) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  file = file as File;
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64Image = buffer.toString("base64");
  await sql`UPDATE camp
            SET image = ${base64Image}
            WHERE id = ${parseInt(campId as string)}`;

  return NextResponse.json({
    image: base64Image,
  });
}
