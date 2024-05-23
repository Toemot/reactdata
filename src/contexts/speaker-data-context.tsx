"use client";

import { Speaker } from "@/lib/general-types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SpeakerState = {
  speakerList: Speaker[];
  loadingStatus: "loading" | "success" | "error";
  error: string | undefined;
};

interface SpeakerDataContextProps {
  speakerState: SpeakerState;
}

const speakerDataContext = createContext<SpeakerDataContextProps | undefined>(
  undefined
);

export default function SpeakerDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const initialState: SpeakerState = {
    speakerList: [],
    loadingStatus: "loading",
    error: undefined,
  };
  const [speakerState, setSpeakerState] = useState<SpeakerState>(initialState);

  useEffect(() => {
    async function go() {
      try {
        const respose = await fetch("/api/speakers");
        const data = await respose.json();
        setSpeakerState({
          speakerList: data,
          loadingStatus: "success",
          error: undefined,
        });
      } catch (error) {
        setSpeakerState({
          ...speakerState,
          loadingStatus: "error",
          error:
            error instanceof Error
              ? error.message ?? "unexpected error"
              : "unexpected error",
        });
      }
    }
    go();
  }, [speakerState]);

  return (
    <speakerDataContext.Provider value={{ speakerState }}>
      {children}
    </speakerDataContext.Provider>
  );
}

export function useSpeakerDataContext() {
  const context = useContext(speakerDataContext);
  if (!context) {
    throw new Error(
      "useSpeakerDataContext must be used within a SpeakerDataProvider"
    );
  }
  return context;
}
