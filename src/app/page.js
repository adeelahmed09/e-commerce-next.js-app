"use client"

import axios from "axios";
import HomeHero from "./Components/HomeHero";
import AboutUs from "./Components/AboutUs";

export default function Home() {
  
  return (
    <main className="w-full  overflow-hidden bg-[#0d1117]">
      <HomeHero/>
      <AboutUs/>
    </main>
  );
}
