
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-ghost btn-sm text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-50"
      >
        {/* <ChevronLeft className="h-4 w-4" /> */}
      </button>

      {/* Page Numbers */}
      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={
            currentPage === page
              ? "btn btn-sm bg-primary text-primary-foreground hover:bg-primary-hover"
              : "btn btn-ghost btn-sm text-muted-foreground hover:text-foreground hover:bg-accent"
          }
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-ghost btn-sm text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-50"
      >
        {/* <ChevronRight className="h-4 w-4" /> */}
      </button>
    </div>
  );
};

export default Pagination;
