import clsx from "clsx";
import { SiVite, SiTailwindcss, SiReact, SiTypescript } from "react-icons/si";

const TechStack = () => {
  return (
    <>
      <div className="fixed bottom-10 right-5 xl:bottom-10 xl:right-10 z-30 text-2xl flex gap-2">
        {[<SiReact />, <SiVite />, <SiTailwindcss />, <SiTypescript />].map(
          (icon, key) => {
            return (
              <div
                key={key}
                className={clsx(
                  "flex items-center justify-center text-black dark:text-white",
                  "dark:bg-white/10 bg-black/10 hover:bg-black/20 backdrop-blur-sm w-12 h-12 rounded-full",
                  "hover:dark:bg-white/15 hover:bg-primary/15 hover:text-amber-700 dark:hover:text-amber-400",
                  "transition-all duration-300 hover:animate-spin"
                )}
              >
                {icon}
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default TechStack;
