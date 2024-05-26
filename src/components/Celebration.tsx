import clsx from "clsx";
import { useState } from "react";
import Confetti from "react-confetti";

interface CelebrationProps {
  score: number;
  bestScore: number;
}

const Celebration = ({ score, bestScore }: CelebrationProps) => {
  const [show, setShow] = useState<boolean>(true);
  return (
    <>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={clsx(
          "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full",
          "transition-all duration-500",
          {
            "hidden": !show,
          }
        )}
      >
        <div className="relative p-4 w-full h-full max-w-full max-h-full flex justify-center items-center backdrop-blur-sm">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-xl">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Congratulations
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={() => setShow(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Score: {score}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Best sore: {bestScore}
              </p>
            </div>

            <div className="flex justify-center items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Celebration;
