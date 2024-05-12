import { useState, createContext, ReactNode } from "react";

import { Theme } from "../types";

type ToggleFunc = () => void;

export const ThemeContext = createContext<Theme>("light");
export const ToggleThemeContext = createContext<ToggleFunc>(() => {});

const getTheme = (): Theme => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    return "dark";
  }

  document.documentElement.classList.remove("dark");
  return "light";
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getTheme());
  const toggleTheme = () => {
    const _theme = theme === "dark" ? "light" : "dark";
    setTheme(_theme);
    localStorage.setItem("theme", _theme);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <ToggleThemeContext.Provider value={toggleTheme}>
        {children}
      </ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
