"use client";

import Footer from "./footer";
import Header from "./header";
import Nav from "./nav";
import Home from "./home";
import NextAuthProvider from "@/contexts/next-auth-provider";

export default function HomePage() {
  return (
    <div className="container-fluid">
      <NextAuthProvider>
        <Header />
        <div className="full-page-border app-content-background">
          <Nav />
          <Home />
        </div>
        <Footer />
      </NextAuthProvider>
    </div>
  );
}
