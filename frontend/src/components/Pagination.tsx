import Button from "./Button";
import type { PaginationMeta } from "../utils/types";

type PaginationProps = {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
};

const Pagination = ({ meta, onPageChange }: PaginationProps) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-600 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-200">
      <span>
        Page {meta.currentPage} of {meta.totalPages}
      </span>
      <div className="flex gap-2">
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
