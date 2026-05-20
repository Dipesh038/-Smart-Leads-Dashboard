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
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition",
        "disabled:cursor-not-allowed disabled:opacity-70",
        full && "w-full",
        variant === "primary" && "bg-ink-900 text-white hover:bg-ink-800 dark:bg-ink-100 dark:text-ink-900",
        variant === "outline" &&
          "border border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:text-ink-900 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100",
        variant === "ghost" && "text-ink-600 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800",
        variant === "danger" && "bg-ember-500 text-white hover:bg-ember-600",
        className
      )}
      {...rest}
    />
  );
};

export default Button;
