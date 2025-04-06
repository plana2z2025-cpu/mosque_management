"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="w-full border-t bg-background py-6 md:py-12"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-xl font-bold">MosqueManager</span>
            </div>
            <p className="text-sm text-gray-500">
              Comprehensive mosque management solution for modern Islamic
              centers.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Features</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Prayer Times
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Event Management
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Financial Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  User Management
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a
                  href="mailto:info@mosquemanager.com"
                  className="hover:text-emerald-600 transition-colors"
                >
                  info@mosquemanager.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-emerald-600 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <address className="not-italic">
                  123 Mosque Street
                  <br />
                  City, State 12345
                </address>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} MosqueManager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
