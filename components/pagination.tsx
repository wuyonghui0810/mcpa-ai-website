"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showEllipsis = totalPages > 7;

  let visiblePages = pages;
  if (showEllipsis) {
    if (currentPage <= 4) {
      visiblePages = [...pages.slice(0, 5), -1, totalPages];
    } else if (currentPage >= totalPages - 3) {
      visiblePages = [1, -1, ...pages.slice(totalPages - 5)];
    } else {
      visiblePages = [1, -1, currentPage - 1, currentPage, currentPage + 1, -2, totalPages];
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium rounded-full border border-mi-border bg-white text-mi-text disabled:opacity-40 disabled:cursor-not-allowed hover:border-mi-orange hover:text-mi-orange transition-colors"
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {visiblePages.map((page, idx) =>
          page < 0 ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-mi-muted">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 text-sm font-medium rounded-full transition-colors ${
                currentPage === page
                  ? "bg-mi-orange text-white"
                  : "bg-white text-mi-text border border-mi-border hover:border-mi-orange hover:text-mi-orange"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium rounded-full border border-mi-border bg-white text-mi-text disabled:opacity-40 disabled:cursor-not-allowed hover:border-mi-orange hover:text-mi-orange transition-colors"
      >
        Next
      </button>
    </div>
  );
}
