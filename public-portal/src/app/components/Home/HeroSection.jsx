// HeroSection.js
"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getIslamicDate } from "@/app/helpers/islamic-date";

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="bg-gradient-to-r from-emerald-800 to-teal-800 mb-8"
    >
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30L60 30M30 30L30 60M30 30L0 30M30 30L30 0' stroke='%23ffffff' stroke-width='2'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="relative">
          <p className="hero-text text-emerald-200 text-center mb-4 font-medium">
            Prayer Times Directory
          </p>
          <h1 className="hero-text text-4xl sm:text-5xl md:text-6xl text-center font-bold text-white mb-6">
            Local Mosque Timings
          </h1>
          <p className="hero-text text-emerald-100 text-center max-w-2xl mx-auto text-lg">
            Stay connected with your local mosques and never miss a prayer. View
            daily prayer schedules and Jumu'ah timings.
          </p>

          {/* Prayer time indicator */}
          <div className="hero-text mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 text-white">
              <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <p className="text-xl font-medium">{getIslamicDate()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get current prayer time (simplified)
function getCurrentPrayerTime() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return "Dhuhr";
  if (hour >= 12 && hour < 15) return "Asr";
  if (hour >= 15 && hour < 18) return "Maghrib";
  if (hour >= 18 && hour < 20) return "Isha";
  return "Fajr";
}

export default HeroSection;
