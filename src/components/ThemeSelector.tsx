import clsx from "clsx";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import { useSetTheme, useTheme } from "../hooks/theme";

const ThemeSelector = () => {
  const theme = useTheme();
  const toggleTheme = useSetTheme();

  return (
    <button
      type="button"
      className={clsx(
        "fixed top-10 right-5 xl:bottom-10 xl:right-10 z-30 text-2xl",
        "flex items-center justify-center text-black dark:text-white",
        "dark:bg-white/10 bg-black/10 hover:bg-black/20 backdrop-blur-sm w-12 h-12 rounded-full",
        "hover:dark:bg-white/15 hover:bg-primary/15 hover:text-amber-700 dark:hover:text-amber-400",
        "transition-all duration-300"
      )}
      onClick={toggleTheme}
    >
      {theme === "light" ? <PiSunDimFill /> : <PiMoonStarsFill />}
    </button>
  );
};

export default ThemeSelector;
