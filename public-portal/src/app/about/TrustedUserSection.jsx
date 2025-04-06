"use client";
import React from "react";

const TrustedUserSection = () => {
  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by Mosques Worldwide
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what mosque administrators are saying about our management
              system.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-current text-yellow-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                "This system has revolutionized how we manage our mosque. The
                prayer time calculations are accurate, and the financial
                tracking has made our reporting so much easier."
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-gray-200 h-8 w-8"></div>
              <div>
                <p className="text-sm font-medium">Imam Abdullah</p>
                <p className="text-xs text-gray-500">Al-Noor Mosque</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-current text-yellow-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                "The permission system is excellent. I can delegate tasks to
                volunteers without worrying about them accessing sensitive
                information. The Ramadan calendar feature is a blessing."
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-gray-200 h-8 w-8"></div>
              <div>
                <p className="text-sm font-medium">Yusuf Rahman</p>
                <p className="text-xs text-gray-500">
                  Islamic Center Administrator
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-current text-yellow-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                "Our community loves the public portal where they can check
                prayer times and upcoming events. The analytics dashboard helps
                us make better decisions for our mosque."
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-gray-200 h-8 w-8"></div>
              <div>
                <p className="text-sm font-medium">Fatima Zahra</p>
                <p className="text-xs text-gray-500">Community Coordinator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedUserSection;
