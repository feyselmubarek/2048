import { useContext } from "react";
import { ThemeContext, ToggleThemeContext } from "../contexts/ThemeProvider";

export const useTheme = () => useContext(ThemeContext);
export const useSetTheme = () => useContext(ToggleThemeContext);
