import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem("smartleads-theme");
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  if (document.documentElement.classList.contains("dark")) {
    return "dark";
  }

  return stored === "dark" ? "dark" : "light";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.colorScheme = theme;
    localStorage.setItem("smartleads-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
