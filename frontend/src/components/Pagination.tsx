import Button from "./Button";
import type { PaginationMeta } from "../utils/types";

type PaginationProps = {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
};

const Pagination = ({ meta, onPageChange }: PaginationProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-600 shadow-card dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-ink-500 dark:text-gray-400">
        Page {meta.currentPage} of {meta.totalPages}
      </span>
      <div className="flex items-center gap-2 self-start sm:self-auto">
        <Button variant="ghost" disabled={!meta.hasPrevPage} onClick={() => onPageChange(meta.currentPage - 1)}>
          Previous
        </Button>
        <Button variant="ghost" disabled={!meta.hasNextPage} onClick={() => onPageChange(meta.currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
