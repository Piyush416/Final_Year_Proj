import React from "react";

const PaginationControls = ({ page, totalPages, goToPage }) => {
  const visiblePages = [];

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    if (page <= 3) {
      visiblePages.push(1, 2, 3, 4, "...", totalPages);
    } else if (page >= totalPages - 2) {
      visiblePages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      visiblePages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
  }

  return (
    <div className="flex gap-2 items-center mt-6 justify-center flex-wrap">
      {visiblePages.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="text-gray-500 px-2">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`px-3 py-1 rounded border ${
              p === page
                ? "bg-blue-600 text-white rounded-3xl"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {p}
          </button>
        )
      )}
    </div>
  );
};

export default PaginationControls;
