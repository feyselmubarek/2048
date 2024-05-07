import clsx from "clsx";
import { useEffect, useState } from "react";

import BoardBackground from "./BoardBackground";
import {
  GameCard,
  getNextGame,
  getBgColor,
  slideLtoR,
  ANIMATION_TIMEOUT,
  slideRtoL,
  slideUtoD,
  slideDtoU,
} from "./utils";

function App() {
  const [game, setGame] = useState<GameCard[]>([]);

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
          setGame((prevGame) => {
            const _state = slideDtoU(prevGame);
            if (_state.moves > 0) {
              setTimeout(
                () => setGame(getNextGame(_state.game)),
                ANIMATION_TIMEOUT
              );
            }
            return _state.game;
          });
          break;

        case "ArrowDown":
          setGame((prevGame) => {
            const _state = slideUtoD(prevGame);
            if (_state.moves > 0) {
              setTimeout(
                () => setGame(getNextGame(_state.game)),
                ANIMATION_TIMEOUT
              );
            }
            return _state.game;
          });
          break;

        case "ArrowLeft":
          setGame((prevGame) => {
            const _state = slideRtoL(prevGame);
            if (_state.moves > 0) {
              setTimeout(
                () => setGame(getNextGame(_state.game)),
                ANIMATION_TIMEOUT
              );
            }
            return _state.game;
          });
          break;

        case "ArrowRight":
          setGame((prevGame) => {
            const _state = slideLtoR(prevGame);
            if (_state.moves > 0) {
              setTimeout(
                () => setGame(getNextGame(_state.game)),
                ANIMATION_TIMEOUT
              );
            }
            return _state.game;
          });
          break;

        default:
          break;
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    function startGame() {
      setGame(getNextGame([]));
    }

    startGame();
  }, []);

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center p-24">
      <div className="p-2 rounded-md bg-white/5">
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
                  "absolute h-[25%] w-[25%] text-2xl md:text-5xl p-2",
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
                    "animate-pop": box.pop,
                  }
                )}
              >
                <div
                  className={clsx(
                    "w-full h-full rounded-md text-black flex justify-center items-center",
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
    </main>
  );
}

export default App;
