"use client";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import { Speaker } from "@/lib/general-types";
import { useSpeakerDataContext } from "@/contexts/speaker-data-context";
import { useSpeakerMenuContext } from "@/contexts/speaker-menu-context";
import useSpeakerSortAndFilter from "@/hooks/use-speaker-sort-and-filter";

export default function SpeakerList() {
  const { speakerState } = useSpeakerDataContext();
  const { searchText } = useSpeakerMenuContext();

  const speakerListSorted = useSpeakerSortAndFilter(
    speakerState.speakerList,
    searchText
  );

  return (
    <div className="container pb-4">
      <div className="row g-4">
        {speakerListSorted.map(function (speaker: Speaker) {
          return <SpeakerDetail key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
}
