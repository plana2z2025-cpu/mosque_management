"use client";
import React from "react";
import Image from "next/image";
import Image2 from "../assets/images/home2.png";
import { Button } from "@/components/ui/button";

const DashboardSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex items-center justify-center">
            <Image
              src={Image2}
              width={550}
              height={550}
              alt="Mosque Management Dashboard"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Dashboard
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Get a complete overview of your mosque's activities with our
                intuitive dashboard. Monitor prayer attendance, track financial
                health, and stay on top of upcoming events.
              </p>
            </div>
            <ul className="grid gap-2 py-4">
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-500 p-1">
                  <svg
                    className="h-2 w-2 text-white"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-gray-500">
                  Real-time analytics and reporting
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-500 p-1">
                  <svg
                    className="h-2 w-2 text-white"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-gray-500">
                  Customizable widgets and layouts
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-500 p-1">
                  <svg
                    className="h-2 w-2 text-white"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-gray-500">
                  Interactive charts and graphs
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-500 p-1">
                  <svg
                    className="h-2 w-2 text-white"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-gray-500">
                  Mobile-friendly interface
                </span>
              </li>
            </ul>
            <div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Explore Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
