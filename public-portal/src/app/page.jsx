// page.js
import React from "react";
import MosqueCardWrapper from "./components/Home/AnimatedMosqueCard";
import { getMosquesApi } from "./apis/mosque.api";
import HeroSection from "./components/Home/HeroSection";
import Pagination from "./components/Home/Pagination";

async function getData(page = 1) {
  const queryParams = {
    page,
    limit: 15,
  };
  const response = await getMosquesApi(queryParams);
  return response[1]?.data;
}

async function Page({ searchParams }) {
  const { page = 1 } = await searchParams;
  const data = await getData(page);
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          {data?.docs?.map((mosque, index) => (
            <div key={index}>
              <MosqueCardWrapper mosque={mosque} />
            </div>
          ))}
        </div>
      </main>

      <dir className="w-full flex justify-center">
        <Pagination
          currentPage={data?.currentPage || 1}
          totalPages={data?.totalPages || 1}
          hasNext={data?.hasNext ?? false}
          hasPrev={data?.hasPrev ?? false}
        />
      </dir>
    </div>
  );
}

export default Page;
