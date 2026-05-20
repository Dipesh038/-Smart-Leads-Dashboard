import clsx from "clsx";
import type { LeadStatus } from "../utils/types";

type BadgeProps = {
  status: LeadStatus;
};

const Badge = ({ status }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        status === "New" && "bg-tide-100 text-tide-700 ring-tide-200 dark:bg-tide-900/80 dark:text-tide-100 dark:ring-tide-700/70",
        status === "Contacted" && "bg-ink-100 text-ink-700 ring-ink-200 dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600",
        status === "Qualified" &&
          "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/80 dark:text-emerald-100 dark:ring-emerald-700/70",
        status === "Lost" && "bg-ember-100 text-ember-700 ring-ember-200 dark:bg-ember-900/80 dark:text-ember-100 dark:ring-ember-700/70"
      )}
    >
      {status}
    </span>
  );
};

export default Badge;
