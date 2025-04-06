"use client";
import React from "react";
import { UsersIcon } from "lucide-react";

const PortalsSection = () => {
  return (
    <section id="portals" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Multiple Access Portals
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our system provides tailored access for different user roles,
              ensuring the right people have the right permissions.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-emerald-100 p-3">
              <UsersIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold">Super Admin</h3>
            <p className="text-sm text-gray-500 text-center">
              Complete system control with full access to all features and
              settings.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-emerald-100 p-3">
              <UsersIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold">Admin Portal</h3>
            <p className="text-sm text-gray-500 text-center">
              Manage users, assign permissions, and oversee mosque operations.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-emerald-100 p-3">
              <UsersIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold">Sub-User Portal</h3>
            <p className="text-sm text-gray-500 text-center">
              Access specific features based on assigned permissions from
              admins.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-emerald-100 p-3">
              <UsersIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold">Public Portal</h3>
            <p className="text-sm text-gray-500 text-center">
              Community access to prayer times, events, and public information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalsSection;
