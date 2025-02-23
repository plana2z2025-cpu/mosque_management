import React from "react";
import MosqueIcon from "../../assets/svgs/mosque.svg";

const EmptyMosque = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px] bg-gray-50 rounded-lg">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <MosqueIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Mosques Found
      </h3>
      <p className="text-gray-500 max-w-sm">
        We couldn't find any mosques matching your search criteria. Please try
        adjusting your filters or search terms.
      </p>
    </div>
  );
};

export default EmptyMosque;
