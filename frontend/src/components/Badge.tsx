import clsx from "clsx";
import type { LeadStatus } from "../utils/types";

type BadgeProps = {
  status: LeadStatus;
};

const Badge = ({ status }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold",
        status === "New" && "bg-tide-100 text-tide-700 dark:bg-tide-900 dark:text-tide-100",
        status === "Contacted" && "bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-100",
        status === "Qualified" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100",
        status === "Lost" && "bg-ember-100 text-ember-700 dark:bg-ember-900 dark:text-ember-100"
      )}
    >
      {status}
    </span>
  );
};

export default Badge;
