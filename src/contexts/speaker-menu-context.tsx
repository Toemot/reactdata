"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface SpeakerMenuContextProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const SpeakerMenuContext = createContext<SpeakerMenuContextProps | undefined>(
  undefined
);

export default function SpeakerMenuProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchText, setSearchText] = useState<string>("");
  const value = { searchText, setSearchText };
  return (
    <SpeakerMenuContext.Provider value={value}>
      {children}
    </SpeakerMenuContext.Provider>
  );
}

export function useSpeakerMenuContext() {
  const context = useContext(SpeakerMenuContext);
  if (!context) {
    throw new Error(
      "UseSpeakerMenuContext should be used in SpeakerMenuContext"
    );
  }
  return context;
}
