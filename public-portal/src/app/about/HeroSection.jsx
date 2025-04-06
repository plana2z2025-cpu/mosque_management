"use client";
import React from "react";
import Image1 from "../assets/images/home1.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Mosque Management System
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Streamline your mosque operations with our comprehensive
                management system. Manage prayer times, events, finances, and
                more in one place.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Get Started
              </Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={Image1}
              width={550}
              height={550}
              alt="Mosque Management Dashboard"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
