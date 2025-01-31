// components/MosqueDashboard.js
"use client";

import { gsap } from "gsap";
import AnimatedCard from "./AnimatedCard";
import PrayerTiming from "./PrayerTiming";
import { useGSAP } from "@gsap/react";

export function MosqueDashboard({ mosque }) {
  useGSAP(() => {
    const timeline = gsap.timeline();

    timeline
      .from(".header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(".info-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      })
      .from(".prayer-timing", {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-800 to-teal-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="header text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">{mosque.name}</h1>
          <p className="text-emerald-200">{mosque.uniqueId}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <AnimatedCard title="Location Details" className="info-card">
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Address:</span>{" "}
                {mosque.address.street}, {mosque.address.city}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">State:</span>{" "}
                {mosque.address.state}, India
              </p>
              <p className="text-gray-700">
                <span className="font-medium">PIN Code:</span>{" "}
                {mosque.address.postalCode}
              </p>
            </div>
          </AnimatedCard>

          <AnimatedCard title="Contact Information" className="info-card">
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span>{" "}
                {mosque.contactInfo.phone}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span>{" "}
                {mosque.contactInfo.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Regular Capacity:</span>{" "}
                {mosque.aboutInfo.capacity.regular} people
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Friday Capacity:</span>{" "}
                {mosque.aboutInfo.capacity.friday} people
              </p>
            </div>
          </AnimatedCard>
        </div>

        <AnimatedCard title="Prayer Timings" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(mosque.timings).map(([name, timing]) => (
              <PrayerTiming
                key={name}
                name={name}
                timing={timing}
                isJumma={name === "jumma"}
              />
            ))}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}

export default MosqueDashboard;
