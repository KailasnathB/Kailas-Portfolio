"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certificates } from "@/components/Certificates"; 
import { Documents } from "@/components/Documents"; 
import { Contact } from "@/components/Contact";

export default function Home() {
  const router = useRouter();
  const [entered, setEntered] = useState(false);
  const [visitorName, setVisitorName] = useState("");

  useEffect(() => {
    // Check both sessionStorage (ensure active tab session) and localStorage
    const activeSession = sessionStorage.getItem("portfolio_active_session");
    const hasEntered = localStorage.getItem("portfolio_entered");
    const name = localStorage.getItem("visitor_name");

    if (activeSession === "true" || hasEntered === "true") {
      setEntered(true);
      if (name) setVisitorName(name);
      // Ensure session is set for current window
      if (!activeSession) sessionStorage.setItem("portfolio_active_session", "true");
    } else {
      router.push("/gateway");
    }
  }, [router]);

  if (!entered) return null;

  return (
    <main className="bg-[#0a0a0f] text-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates /> {/* <-- ADDED CERTIFICATES HERE */}
      <Documents />
      <Contact />
      {visitorName && (
        <div className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 text-zinc-300 text-sm shadow-2xl flex items-center gap-2 font-medium">
          <span>Welcome, {visitorName}</span> 👋
        </div>
      )}
    </main>
  );
}
