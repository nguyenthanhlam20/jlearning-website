"use client";
import { useState } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [visiblePages, setVisiblePages] = useState(5);

  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const getPageRange = () => {
    if (totalPages <= visiblePages) {
      return range(1, totalPages);
    }

    const half = Math.floor(visiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + visiblePages - 1, totalPages);

    if (end - start < visiblePages - 1) {
      start = Math.max(end - visiblePages + 1, 1);
    }

    return range(start, end);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const pageRange = getPageRange();

  return (

    <>
      {totalPages > 1 ?
        <div className="w-full">
          <ul className="flex items-center justify-center">
            <li className={` mx-1 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
              <a
                href="#0"
                onClick={handlePrevClick}
                className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
              >
                Prev
              </a>
            </li>
            {pageRange.map((pageNumber) => (
              <li className="mx-1" key={pageNumber}>
                <a
                  href="#0"
                  onClick={() => handlePageClick(pageNumber)}
                  className={`flex h-9 min-w-[36px] items-center justify-center rounded-md ${pageNumber === currentPage
                    ? "bg-primary text-white"
                    : "bg-body-color bg-opacity-[15%] text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                    } px-4 text-sm`}
                >
                  {pageNumber}
                </a>
              </li>
            ))}
            {totalPages > visiblePages && currentPage < totalPages - Math.floor(visiblePages / 2) && (
              <li className="mx-1">
                <a className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color">
                  ...
                </a>
              </li>
            )}
            <li className={  `   mx-1 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}>
              <a
                href="#0"
                onClick={handleNextClick}
                className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </div> : <></>}</>

  );
}

export default Pagination;