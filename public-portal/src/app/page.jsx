"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP, ScrollTrigger } from "@gsap/react";
import Calendar from "../app/assets/svgs/calendar.svg";
import ChevronDown from "../app/assets/svgs/chevrondown.svg";
import ChevronUp from "../app/assets/svgs/chevronup.svg";
import MapPin from "../app/assets/svgs/mappin.svg";

gsap.registerPlugin(ScrollTrigger);

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

const MosqueCard = ({ mosque, index, expandedStates, toggleMosque }) => {
  const cardRef = useRef(null);
  const isExpanded = expandedStates[mosque.name] !== false; // Default to expanded

  // useGSAP(() => {
  //   if (cardRef.current) {
  //     gsap.fromTo(
  //       cardRef.current,
  //       { opacity: 0, y: 50, scale: 0.9 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         scale: 1,
  //         // duration: 0.6,
  //         // delay: index * 0.2,
  //         ease: "power3.out",
  //       }
  //     );
  //   }
  // }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-md overflow-hidden flex-"
    >
      <div
        className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 cursor-pointer hover:bg-emerald-700"
        onClick={() => toggleMosque(mosque.name)}
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

      <div
        className={`transition-all duration-300 ${
          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {Object.entries(mosque.timings).map(
              ([prayer, times]) =>
                prayer !== "jumma" && (
                  <PrayerTimeCard key={prayer} prayer={prayer} times={times} />
                )
            )}
          </div>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [expandedStates, setExpandedStates] = useState({});

  useGSAP(() => {
    gsap.fromTo(
      ".gsap-animation-1",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.2,
      }
    );

    // gsap.from(".gsap-animation-1", {
    //   opacity: 0,
    //   y: 50,
    //   scale: 0.9,
    // });
  }, []);

  const toggleMosque = (mosqueName) => {
    setExpandedStates((prev) => ({
      ...prev,
      [mosqueName]: !prev[mosqueName],
    }));
  };

  const data = [
    {
      name: "Mosque Test 1",
      city: "Springfield, IL",
      timings: {
        fajr: { azaan: "05:15", jamaat: "05:30" },
        dhuhr: { azaan: "12:30", jamaat: "12:45" },
        asr: { azaan: "15:45", jamaat: "16:00" },
        maghrib: { azaan: "18:30", jamaat: "18:45" },
        isha: { azaan: "20:00", jamaat: "20:15" },
        jumma: { azaan: "13:15", jamaat: "13:30", qutba: "13:10" },
      },
    },
    {
      name: "Jamia Masjid",
      city: "Nagar Karnul, TG",
      timings: {
        fajr: { azaan: "05:15", jamaat: "05:30" },
        dhuhr: { azaan: "12:30", jamaat: "12:45" },
        asr: { azaan: "15:45", jamaat: "16:00" },
        maghrib: { azaan: "18:30", jamaat: "18:45" },
        isha: { azaan: "20:00", jamaat: "20:15" },
        jumma: { azaan: "13:15", jamaat: "13:30", qutba: "13:10" },
      },
    },
    {
      name: "Alfalah Mosque",
      city: "Springfield, IL",
      timings: {
        fajr: { azaan: "05:31", jamaat: "05:30" },
        dhuhr: { azaan: "12:30", jamaat: "12:45" },
        asr: { azaan: "15:45", jamaat: "16:00" },
        maghrib: { azaan: "18:30", jamaat: "18:45" },
        isha: { azaan: "20:00", jamaat: "20:15" },
        jumma: { azaan: "13:15", jamaat: "13:30", qutba: "13:10" },
      },
    },
    {
      name: "Alfalah Mosque2",
      city: "Springfield, IL2",
      timings: {
        fajr: { azaan: "05:31", jamaat: "05:30" },
        dhuhr: { azaan: "12:30", jamaat: "12:45" },
        asr: { azaan: "15:45", jamaat: "16:00" },
        maghrib: { azaan: "18:30", jamaat: "18:45" },
        isha: { azaan: "20:00", jamaat: "20:15" },
        jumma: { azaan: "13:15", jamaat: "13:30", qutba: "13:10" },
      },
    },
  ];

  return (
    <div className="bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {data.map((mosque, index) => (
            <div key={index} className="gsap-animation-1">
              <MosqueCard
                mosque={mosque}
                index={index}
                toggleMosque={toggleMosque}
                expandedStates={expandedStates}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
