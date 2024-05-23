import { createSpeakerRecord, getSpeakers } from "@/lib/prisma/speaker-utils";
import { NextRequest } from "next/server";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function GET(request: NextRequest) {
  await sleep(2000);
  // debugger;
  const speakers = await getSpeakers("");
  return new Response(JSON.stringify(speakers, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  await sleep(2000);
  try {
    const data = await request.json();
    delete data.id;
    delete data.favorite;

    const newSpeaker = await createSpeakerRecord(data);
    return new Response(JSON.stringify(newSpeaker, null, 2), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error creating a speaker" }),
      {
        status: 500,
      }
    );
  }
}
