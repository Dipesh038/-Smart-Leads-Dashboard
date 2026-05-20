import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const InputField = ({ label, error, className, ...rest }: InputFieldProps) => {
  return (
    <label className="flex w-full flex-col gap-2 text-sm font-medium text-ink-700 dark:text-gray-300">
      <span>{label}</span>
      <input
        className={clsx(
          "rounded-xl border border-ink-200 bg-white px-3 py-2 text-ink-900 outline-none transition placeholder:text-ink-400 disabled:cursor-not-allowed disabled:opacity-60",
          "focus:border-ink-400 focus:ring-2 focus:ring-ink-100",
          "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-gray-700",
          error && "border-ember-400 focus:border-ember-500 focus:ring-ember-100 dark:border-ember-700 dark:focus:border-ember-600 dark:focus:ring-ember-900/50",
          className
        )}
        {...rest}
      />
      {error ? <span className="text-xs text-ember-600 dark:text-ember-300">{error}</span> : null}
    </label>
  );
};

export default InputField;
