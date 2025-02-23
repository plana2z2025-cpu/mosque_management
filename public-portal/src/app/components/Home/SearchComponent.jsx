"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import SearchIcon from "../../assets/svgs/search.svg";

const SearchComponent = () => {
  //   const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [info, setInfo] = useState({
    search: "",
  });

  useEffect(() => {
    let searchName = searchParams.get("search");
    if (searchName) {
      setInfo((prev) => ({
        ...prev,
        search: searchName,
      }));
    }
  }, []);

  // Initialize search term from URL on component mount

  const changeHandlerFunction = useCallback(
    (e) => {
      const { name, value } = e?.target;
      setInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [info?.search]
  );

  const submitQueryHandler = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("search", info.search);
    window.location.href = `${pathname}?${params.toString()}`;
  }, [info.search, pathname, searchParams]);

  return (
    <form className="flex items-center mb-8">
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 21 21"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="voice-search"
          name="search"
          value={info?.search}
          onChange={changeHandlerFunction}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="Search Mockups, Logos, Design Templates..."
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <svg
            className="w-4 h-4 text-gray-500 hover:text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
            />
          </svg>
        </button>
      </div>
      <button
        type="submit"
        className="text-green-700 flex hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={submitQueryHandler}
      >
        <SearchIcon />
        Search
      </button>
    </form>
  );
};

export default SearchComponent;
