"use client";
import React from "react";
import {
  CalendarIcon,
  ClockIcon,
  BarChart3Icon,
  SettingsIcon,
  ImageIcon,
} from "lucide-react";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comprehensive Features
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to efficiently manage your mosque in one
              integrated platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
            <CalendarIcon className="h-10 w-10 text-emerald-600" />
            <h3 className="text-xl font-bold">Event Management</h3>
            <p className="text-sm text-gray-500">
              Create, schedule, and manage mosque events with ease. Send
              notifications to community members.
            </p>
          </div>
          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
            <ClockIcon className="h-10 w-10 text-emerald-600" />
            <h3 className="text-xl font-bold">Prayer Timings</h3>
            <p className="text-sm text-gray-500">
              Automatically calculate and display accurate prayer times based on
              your location.
            </p>
          </div>
          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
            <BarChart3Icon className="h-10 w-10 text-emerald-600" />
            <h3 className="text-xl font-bold">Financial Analytics</h3>
            <p className="text-sm text-gray-500">
              Track expenses, donations, and generate detailed financial reports
              with visual charts.
            </p>
          </div>
          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
            <CalendarIcon className="h-10 w-10 text-emerald-600" />
            <h3 className="text-xl font-bold">Ramadan Timings</h3>
            <p className="text-sm text-gray-500">
              Special calendar for Ramadan with iftar and suhoor times, plus
              special event scheduling.
            </p>
          </div>
          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
            <ImageIcon className="h-10 w-10 text-emerald-600" />
            <h3 className="text-xl font-bold">Gallery Management</h3>
            <p className="text-sm text-gray-500">
              Upload and organize photos from mosque events and activities to
              share with the community.
            </p>
          </div>
          <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
            <SettingsIcon className="h-10 w-10 text-emerald-600" />
            <h3 className="text-xl font-bold">Administration Settings</h3>
            <p className="text-sm text-gray-500">
              Customize system settings, user permissions, and notification
              preferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
