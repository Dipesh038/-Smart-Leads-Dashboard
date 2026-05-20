import clsx from "clsx";
import Button from "./Button";
import { useTheme } from "../hooks/useTheme";

type ThemeToggleButtonProps = {
  className?: string;
};

const ThemeToggleButton = ({ className }: ThemeToggleButtonProps) => {
  const { theme, toggleTheme } = useTheme();
  const nextThemeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className={clsx(
        "fixed right-4 top-4 z-[70] h-11 w-11 rounded-full px-0 py-0 text-lg shadow-card backdrop-blur-sm sm:right-6 sm:top-6",
        className
      )}
      aria-label={nextThemeLabel}
      title={nextThemeLabel}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
    </Button>
  );
};

export default ThemeToggleButton;
