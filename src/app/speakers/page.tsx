"use client";

import Header from "@/app/header";
import Nav from "@/app/nav";
import SpeakerDataProvider from "@/contexts/speaker-data-context";
import SpeakerList from "@/app/speakers/speaker-list";
import Footer from "@/app/footer";

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
