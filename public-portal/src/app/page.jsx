// page.js
import React from "react";
import MosqueCardWrapper from "./components/Home/AnimatedMosqueCard";
import { getMosquesApi } from "./apis/mosque.api";
import HeroSection from "./components/Home/HeroSection";

async function getData() {
  const response = await getMosquesApi();
  return response[1]?.data?.docs;
}

async function Page() {
  const data = await getData();

  return (
    <div className="bg-gray-50">
      <HeroSection />
      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          {data?.map((mosque, index) => (
            <div key={index}>
              <MosqueCardWrapper mosque={mosque} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Page;
