import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "outline" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  full?: boolean;
};

const Button = ({ variant = "primary", full, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tide-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0f1117]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        full && "w-full",
        variant === "primary" && "bg-ink-900 text-white hover:bg-ink-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white",
        variant === "outline" &&
          "border border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:text-ink-900 dark:border-gray-500 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
        variant === "ghost" && "text-ink-600 hover:bg-ink-100 hover:text-ink-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white",
        variant === "danger" && "bg-ember-500 text-white hover:bg-ember-600 dark:bg-ember-600 dark:hover:bg-ember-500",
        className
      )}
      {...rest}
    />
  );
};

export default Button;
