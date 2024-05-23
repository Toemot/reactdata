import {
  deleteSpeakerRecord,
  getSpeakerDataById,
  updateSpeakerRecord,
} from "@/lib/prisma/speaker-utils";
import { Speaker } from "@/lib/general-types";
import { NextRequest } from "next/server";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = Number(params.id);

  try {
    await sleep(500);
    let speaker = await getSpeakerDataById(id);
    if (!speaker) {
      return new Response(
        JSON.stringify({ message: "Speaker not found:", id }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify(speaker, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PUT(request: NextRequest) {
  const requestData = await request.json();
  const {
    id,
    firstName,
    lastName,
    company,
    twitterHandle,
    userBioShort,
    timeSpeaking,
    favorite,
  } = requestData;

  const speaker: Speaker = {
    id,
    firstName,
    lastName,
    company,
    twitterHandle,
    userBioShort,
    timeSpeaking,
    favorite,
  };

  await sleep(1000);
  try {
    let updatedSpeaker = await updateSpeakerRecord(speaker);
    return new Response(JSON.stringify(updatedSpeaker, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating speaker" }), {
      status: 500,
    });
  }
}

export async function Delete(
  request: Request,
  { params }: { params: { id: number } }
) {
  await sleep(1000);
  const id = Number(request.url.split("/").pop());

  try {
    await deleteSpeakerRecord(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error deleting speaker:", id }),
      {
        status: 500,
      }
    );
  }
}
