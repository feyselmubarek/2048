export enum Animation {
  ADD = "ADD",
  NEW = "NEW",
}

export enum KeyPress {
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
  UP = "ArrowUp",
  DOWN = "ArrowDown",
}

export enum Direction {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN",
}

export type GameCard = {
  x: number;
  y: number;
  val: number;
  id: string;
  animation?: Animation;
};

export type Game = GameCard[];

export type State = {
  game: Game;
  moves: number;
};

export type SliderFunc = (game: Game) => State;

export type Theme = "light" | "dark";
