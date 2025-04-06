"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <span className="text-xl font-bold">MosqueManager</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#portals"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Portals
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="block md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px]">
                <div className="flex flex-col gap-6 py-6">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
                      <span className="text-white font-bold">M</span>
                    </div>
                    <span className="text-xl font-bold">MosqueManager</span>
                  </div>
                  <nav className="flex flex-col gap-4">
                    <Link
                      href="#features"
                      className="text-sm font-medium hover:text-emerald-600 transition-colors"
                    >
                      Features
                    </Link>
                    <Link
                      href="#portals"
                      className="text-sm font-medium hover:text-emerald-600 transition-colors"
                    >
                      Portals
                    </Link>
                    <Link
                      href="#testimonials"
                      className="text-sm font-medium hover:text-emerald-600 transition-colors"
                    >
                      Testimonials
                    </Link>
                    <Link
                      href="#contact"
                      className="text-sm font-medium hover:text-emerald-600 transition-colors"
                    >
                      Contact
                    </Link>
                  </nav>
                  <div className="flex flex-col gap-2 mt-4">
                    <Button variant="outline" className="w-full justify-start">
                      Log In
                    </Button>
                    <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700">
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
