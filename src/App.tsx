import clsx from "clsx";
import { useEffect, useState } from "react";

import BoardBackground from "./BoardBackground";
import {
  getNextGame,
  getBgColor,
  slideLtoR,
  ANIMATION_TIMEOUT,
  slideRtoL,
  slideUtoD,
  slideDtoU,
} from "./utils";
import Heading from "./components/Heading";
import { Animation, GameCard, KeyPress, SliderFunc, State } from "./types";
import ThemeSelector from "./components/ThemeSelector";

import gradientPng from "./assets/gradient.png";
import gradientAvif from "./assets/gradient.avif";
import gradientDarkPng from "./assets/gradient-dark.png";
import gradientDarkAvif from "./assets/gradient-dark.avif";
import { useTheme } from "./hooks/theme";
import Celebration from "./components/Celebration";

let timeOutId: number | undefined = undefined;

function App() {
  const theme = useTheme();
  const [game, setGame] = useState<GameCard[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    function scheduleNext({ game, moves }: State) {
      if (moves) {
        timeOutId = setTimeout(() => {
          setGame(getNextGame(game));
          setScore((score) => score + moves);
          timeOutId = undefined;
        }, ANIMATION_TIMEOUT);
      }
    }

    function playWith(func: SliderFunc) {
      if (!timeOutId) {
        setGame((prevGame) => {
          const _state = func(prevGame);
          scheduleNext(_state);
          return _state.game;
        });
      }
    }

    function keyDownHandler(e: KeyboardEvent) {
      switch (e.key) {
        case KeyPress.UP:
          playWith(slideDtoU);
          break;

        case KeyPress.DOWN:
          playWith(slideUtoD);
          break;

        case KeyPress.LEFT:
          playWith(slideRtoL);
          break;

        case KeyPress.RIGHT:
          playWith(slideLtoR);
          break;
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    // start the game
    setGame(getNextGame([]));
  }, []);

  const isGameWon = game.filter((card) => card.val === 2048).length >= 1;

  return (
    <main
      className={clsx(
        "flex h-screen w-screen flex-col items-center justify-center",
        {
          dark: theme === "dark",
        }
      )}
    >
      {isGameWon && <Celebration score={score} bestScore={score} />}
      <picture className="absolute -z-10 top-0 left-0 w-[75%]">
        <source srcSet={gradientAvif} type="image/avif" />
        <img src={gradientPng} className="dark:hidden" />
      </picture>
      <picture className="absolute -z-10 top-0 left-0 w-[75%]">
        <source srcSet={gradientDarkAvif} type="image/avif" />
        <img src={gradientDarkPng} className="dark:block" />
      </picture>

      <Heading
        score={score}
        onRefresh={() => {
          setGame(getNextGame([]));
          setScore(0);
        }}
      />

      <div className="p-2 rounded-md dark:bg-white/5 bg-black/5">
        <div
          className={clsx(
            "xl:text-xl xl:rounded relative",
            "w-[20rem] h-[20rem] md:w-[34rem] md:h-[34rem]",
            "grid grid-rows-4 grid-cols-4"
          )}
        >
          <BoardBackground />
          {game.map((box: GameCard) => {
            return (
              <div
                key={box.id}
                className={clsx(
                  "absolute h-[25%] w-[25%] text-2xl p-2",
                  "flex justify-center items-center",
                  "transition-all duration-200",
                  {
                    "top-[0%]": box.y === 0,
                    "top-[25%]": box.y === 1,
                    "top-[50%]": box.y === 2,
                    "top-[75%]": box.y === 3,
                    "left-[0%]": box.x === 0,
                    "left-[25%]": box.x === 1,
                    "left-[50%]": box.x === 2,
                    "left-[75%]": box.x === 3,
                    "animate-new": box.animation === Animation.NEW,
                    "animate-add": box.animation === Animation.ADD,
                    "md:text-5xl": box.val < 1024,
                    "md:text-4xl": box.val >= 1024,
                  }
                )}
              >
                <div
                  className={clsx(
                    "w-full h-full rounded-md text-black",
                    "flex justify-center items-center",
                    getBgColor(box.val)
                  )}
                >
                  {box.val}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ThemeSelector />
    </main>
  );
}

export default App;
