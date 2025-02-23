import React from "react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  hasNext = false,
  hasPrev = false,
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <a
            href={hasPrev ? `?page=${currentPage - 1}` : "#"}
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
              !hasPrev && "cursor-not-allowed opacity-50"
            }`}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>

        {getPageNumbers().map((pageNumber, index) => (
          <li key={index}>
            {pageNumber === "..." ? (
              <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">
                ...
              </span>
            ) : (
              <a
                href={`?page=${pageNumber}`}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                  pageNumber === currentPage &&
                  "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                }`}
                aria-current={pageNumber === currentPage ? "page" : undefined}
              >
                {pageNumber}
              </a>
            )}
          </li>
        ))}

        <li>
          <a
            href={hasNext ? `?page=${currentPage + 1}` : "#"}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
              !hasNext && "cursor-not-allowed opacity-50"
            }`}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
