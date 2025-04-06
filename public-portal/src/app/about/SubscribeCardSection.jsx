"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const SubscribeCardSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Mosque Management?
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join hundreds of mosques already using our platform to streamline
              their operations.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Get Started Today
            </Button>
            <Button variant="outline">Request a Demo</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeCardSection;
