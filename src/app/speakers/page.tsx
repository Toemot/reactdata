"use client";

import Header from "../header";
import Nav from "../nav";
import SpeakerDataProvider from "@/contexts/speaker-data-context";
import SpeakerList from "./speaker-list";
import Footer from "../footer";

export default function Speakers() {
  return (
    <div className="container">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />
        <SpeakerDataProvider>
          <SpeakerList />
        </SpeakerDataProvider>
      </div>
      <Footer />
    </div>
  );
}
