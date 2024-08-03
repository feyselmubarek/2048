import clsx from "clsx";
import { FaInfo } from "react-icons/fa6";
import { GiRecycle } from "react-icons/gi";

type HeadingProps = {
  score: number;
  onRefresh: () => void;
  showModal: React.MouseEventHandler<HTMLButtonElement>;
};

const Heading = ({ onRefresh, score, showModal }: HeadingProps) => {
  return (
    <>
      <div className="">
        <p className="text-center text-6xl font-semibold mb-10 text-amber-700 dark:text-amber-600">
          2048
        </p>
      </div>

      <div
        className={clsx(
          "flex justify-between items-center mb-10 gap-4",
          "w-[20rem] md:w-[34rem]"
        )}
      >
        <div className="flex gap-4">
          <div className="dark:bg-white/10 bg-black/10 p-2 w-24 text-center rounded">
            <p className="font-bold text-amber-600 uppercase">Score</p>
            <p className="text-2xl font-semibold text-amber-900 dark:text-amber-200">
              {score}
            </p>
          </div>

          <div className="dark:bg-white/10 bg-black/10 p-2 w-24 text-center rounded">
            <p className="font-bold text-amber-600 uppercase">Best</p>
            <p className="text-2xl font-semibold text-amber-900 dark:text-amber-200">
              10
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className={clsx(
              "text-xl flex items-center justify-center",
              "dark:bg-white/10 bg-black/10 p-2 w-12 h-12 rounded",
              "hover:dark:bg-white/15 hover:bg-primary/15 hover:text-accent",
              "transition-all duration-300"
            )}
            onClick={onRefresh}
          >
            <GiRecycle className="text-amber-700 dark:text-amber-400" />
          </button>

          <button
            type="button"
            className={clsx(
              "text-xl flex items-center justify-center",
              "dark:bg-white/10 bg-black/10 p-2 w-12 h-12 rounded",
              "hover:dark:bg-white/15 hover:bg-primary/15 hover:text-accent",
              "transition-all duration-300"
            )}
            onClick={showModal}
          >
            <FaInfo className="text-amber-700 dark:text-amber-400" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Heading;
