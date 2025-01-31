// MosqueCardWrapper.js
"use client";
import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import Calendar from "../../assets/svgs/calendar.svg";
import MapPin from "../../assets/svgs/mappin.svg";
import Eye from "../../assets/svgs/eye.svg";
import ChevronDown from "../../assets/svgs/chevrondown.svg";
import ChevronUp from "../../assets/svgs/chevronup.svg";
import { useGSAP } from "@gsap/react";

const PrayerTimeCard = ({ prayer, times }) => (
  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
    <h3 className="text-base font-medium text-gray-800 mb-1 capitalize">
      {prayer}
    </h3>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <p className="text-xs text-gray-500">Azaan</p>
        <p className="text-sm font-medium text-gray-700">{times.azaan}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Jamaat</p>
        <p className="text-sm font-medium text-gray-700">{times.jamaat}</p>
      </div>
    </div>
  </div>
);

function MosqueCardWrapper({ mosque }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".mosque-cards-animation",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.2,
      }
    );
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);

    if (!isExpanded) {
      // Expand animation
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else {
      // Collapse animation
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="mosque-cards-animation bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div
        className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 cursor-pointer hover:bg-emerald-700"
        onClick={toggleExpand}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-white">{mosque.name}</h2>
            <div className="flex items-center text-emerald-100 text-sm">
              <span className="mr-1">
                <MapPin />
              </span>
              <p>{mosque.city}</p>
            </div>
          </div>
          <button className="text-white p-1 hover:bg-white/10 rounded-full transition-colors">
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>

      <div ref={contentRef} className="overflow-hidden">
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {Object.entries(mosque.timings).map(
              ([prayer, times]) =>
                prayer !== "jumma" && (
                  <PrayerTimeCard key={prayer} prayer={prayer} times={times} />
                )
            )}
          </div>

          {/* Jumu'ah Prayer Section */}
          <div className="mt-3 bg-amber-50 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <span className="text-amber-800 mr-1">
                <Calendar />
              </span>
              <h3 className="text-sm font-semibold text-amber-800">
                Jumu'ah Prayer
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mosque.timings.jumma && (
                <>
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <p className="text-xs text-amber-600 font-medium">Qutba</p>
                    <p className="text-sm text-gray-700">
                      {mosque.timings.jumma.qutba}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <p className="text-xs text-amber-600 font-medium">Azaan</p>
                    <p className="text-sm text-gray-700">
                      {mosque.timings.jumma.azaan}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <p className="text-xs text-amber-600 font-medium">Jamaat</p>
                    <p className="text-sm text-gray-700">
                      {mosque.timings.jumma.jamaat}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex space-x-4 p-4 w-full">
            <a
              href="https://www.google.com/maps?q=37.7749,-122.4194"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center 
                  border-2 border-blue-500 text-blue-500 
                  px-4 py-2 rounded-md 
                  hover:bg-blue-500 hover:text-white 
                  transition-all duration-300 
                  transform hover:scale-105 
                  hover:shadow-md w-1/2"
            >
              <MapPin />
              Open in Google Maps
            </a>

            <a
              href={`/${mosque?.slug}`}
              className="flex items-center justify-center 
                  border-2 border-green-500 text-green-500 
                  px-4 py-2 rounded-md 
                  hover:bg-green-500 hover:text-white 
                  transition-all duration-300 
                  transform hover:scale-105 
                  hover:shadow-md w-1/2"
            >
              <Eye />
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MosqueCardWrapper;
