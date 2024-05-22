/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

export default function SpeakerFavorite({ speaker }) {
  const [updating, setUpdating] = useState(false);
  const [speakerLocal, setSpeakerLocal] = useState(speaker);

  async function toggleFavorite() {
    try {
      setUpdating(true);
      const updateSpeaker = {
        ...speakerLocal,
        favorite: !speakerLocal.favorite,
      };
      const response = await fetch(`http://localhost:3000/api/speakers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateSpeaker),
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (response.ok) {
        setSpeakerLocal(updateSpeaker);
      }
    } catch (error) {
      console.error("Error updating speaker status", error);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <>
      {updating ? (
        <img src="/images/spinning.gif" width={25} alt={"busy"} />
      ) : (
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
