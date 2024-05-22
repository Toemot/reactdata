"use client";
import { useState } from "react";
import speakerAction from "./speaker-action";

export default function SpeakerFavorite({ speaker }) {
  const [speakerLocal, setSpeakerLocal] = useState(speaker);
  const [updating, setUpdating] = useState(false);

  async function toggleFavorite() {
    try {
      setUpdating(true);
      const updatedSpeaker = {
        ...speakerLocal,
        favorite: !speakerLocal.favorite,
      };
      await speakerAction(updatedSpeaker);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSpeakerLocal(updatedSpeaker);
    } catch (error) {
      console.error("Error updating favorite speaker status: ", error);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <>
      {updating ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/images/spinning.gif" width={25} alt={"busy"} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/images/${
            speakerLocal.favorite ? "heart-red.png" : "heart-dark.png"
          }`}
          onClick={!updating ? toggleFavorite : undefined}
          alt="Favorite toggle"
          style={{
            cursor: updating ? "default" : "pointer",
          }}
        />
      )}
    </>
  );
}
