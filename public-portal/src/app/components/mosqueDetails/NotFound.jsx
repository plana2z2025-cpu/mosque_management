import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
        {/* Decorative Islamic Pattern - Simplified geometric shape */}
        <div className="mx-auto w-24 h-24 mb-8">
          <div className="w-full h-full border-4 border-emerald-600 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-emerald-600 rounded-full"></div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Mosque Not Found
        </h1>

        {/* Arabic text - "Page Not Found" */}
        <p className="text-xl text-emerald-600 font-semibold mb-4" dir="rtl">
          الصفحة غير موجودة
        </p>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          We apologize, but we couldn't find the mosque you're looking for. It
          may have been removed or the URL might be incorrect.
        </p>

        {/* Action buttons */}
        <div className="space-y-3">
          <a
            href="/"
            className="w-full sm:w-auto bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors"
          >
            Return to Home
          </a>

          <div className="flex justify-center">
            <a
              href={"/"}
              className="text-emerald-600 hover:text-emerald-700 transition-colors text-sm"
            >
              View All Mosques
            </a>
          </div>
        </div>

        {/* Footer quote */}
        <p className="mt-12 text-gray-500 text-sm italic">
          "Indeed, Allah is with those who are patient" - Al-Baqarah 2:153
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
