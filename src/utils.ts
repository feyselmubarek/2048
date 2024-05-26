import { v4 as uuidv4 } from "uuid";
import { Animation, Direction, Game, GameCard, State } from "./types";

const DirectionNum = {
  LEFT: 1,
  RIGHT: -1,
  UP: 1,
  DOWN: -1,
};

export const ANIMATION_TIMEOUT = 200;

const GRID_SIZE = 4;

const COLORS: { [key: number]: string } = {
  2: "bg-orange-400",
  4: "bg-lime-500",
  8: "bg-green-500",
  16: "bg-purple-500",
  32: "bg-blue-500",
  64: "bg-orange-500",
  128: "bg-cyan-600",
  256: "bg-red-400",
  512: "bg-fuchsia-400",
  1024: "bg-yellow-500",
  2048: "bg-amber-600",
};

export const getBgColor = (num: number): string => {
  return COLORS[num];
};

export const processVerticalMove = (
  game: Game,
  direction: Direction
): State => {
  const _game = structuredClone<Game>(game);
  let moves = 0;

  // collect cards with similar x co'ordinate
  const map: { [key: number]: Game } = { 0: [], 1: [], 2: [], 3: [] };
  _game.forEach((card: GameCard) => {
    delete card.animation;
    map[card.x].push(card);
  });

  // for each col (x co'ordinate) slide in up or down direction
  for (let col = 0; col < GRID_SIZE; col++) {
    // same x co'ordinates cards
    const colCards = map[col];

    colCards.sort((a: GameCard, b: GameCard) => a.y - b.y);

    const len = colCards.length;
    // detect starting position based on direction
    let row = direction === Direction.DOWN ? len - 1 : 0;

    while (0 <= row && row < len) {
      const prevRow = row + 1 * DirectionNum[direction];

      // possible destination position after slide
      const nextRow = row - 1 * DirectionNum[direction];
      let newY;

      // detecting destination Y co'ordinate after slide
      if (direction === Direction.DOWN) {
        newY = (nextRow === len ? GRID_SIZE : colCards[nextRow].y) - 1;
      } else {
        newY = nextRow === -1 ? 0 : colCards[nextRow].y + 1;
      }

      const end = direction === Direction.DOWN ? 0 : len - 1;
      moves += Math.abs(colCards[row].y - newY);

      if (row === end || colCards[row].val !== colCards[prevRow].val) {
        colCards[row].y = newY;
        row += 1 * DirectionNum[direction];
      } else {
        moves += Math.abs(colCards[prevRow].y - newY);
        colCards[row].y = newY;
        colCards[prevRow].y = newY;
        row += 2 * DirectionNum[direction];
      }
    }
  }

  return { game: _game, moves };
};

export const processHorizontalMove = (
  game: Game,
  direction: Direction
): State => {
  const _game = structuredClone<Game>(game);
  const map: { [key: number]: Game } = { 0: [], 1: [], 2: [], 3: [] };
  let moves = 0;

  _game.forEach((card: GameCard) => {
    delete card.animation;
    map[card.y].push(card);
  });

  for (let row = 0; row < GRID_SIZE; row++) {
    const rowCards = map[row];
    rowCards.sort((a: GameCard, b: GameCard) => a.x - b.x);

    const len = rowCards.length;
    let col = direction === Direction.RIGHT ? len - 1 : 0;

    while (0 <= col && col < len) {
      const prevCol = col + 1 * DirectionNum[direction];
      const nextCol = col - 1 * DirectionNum[direction];
      let newX;

      if (direction === Direction.RIGHT) {
        newX = (nextCol === len ? GRID_SIZE : rowCards[nextCol].x) - 1;
      } else {
        newX = nextCol === -1 ? 0 : rowCards[nextCol].x + 1;
      }

      const end = direction === Direction.RIGHT ? 0 : len - 1;
      moves += Math.abs(rowCards[col].x - newX);

      if (col === end || rowCards[col].val !== rowCards[prevCol].val) {
        rowCards[col].x = newX;
        col += 1 * DirectionNum[direction];
      } else {
        moves += Math.abs(rowCards[prevCol].x - newX);

        rowCards[col].x = newX;
        rowCards[prevCol].x = newX;

        col += 2 * DirectionNum[direction];
      }
    }
  }

  return { game: _game, moves };
};

export const getNextGame = (game: Game): Game => {
  const cardsByXAndY: { [row: number]: { [col: number]: GameCard } } = {};
  const _game = structuredClone<Game>(game);

  _game.forEach((card: GameCard) => {
    const x = card.x,
      y = card.y;

    if (!cardsByXAndY[x]) {
      cardsByXAndY[x] = {};
    }

    if (cardsByXAndY[x][y]) {
      cardsByXAndY[x][y].val *= 2;
      cardsByXAndY[x][y].animation = Animation.ADD;
    } else {
      cardsByXAndY[x][y] = card;
    }
  });

  const nextGame: Game = [];
  const set = new Set<number>([]);

  for (let i = 0; i < 16; i++) {
    set.add(i);
  }

  for (const row in cardsByXAndY) {
    for (const col in cardsByXAndY[row]) {
      nextGame.push(cardsByXAndY[row][col]);
      const position =
        cardsByXAndY[row][col].y * GRID_SIZE + cardsByXAndY[row][col].x;
      set.delete(position);
    }
  }

  const random = [...set][Math.floor(Math.random() * set.size)];
  const randomVal = [2, 2, 2, 4][Math.floor(Math.random() * 4)];

  nextGame.push({
    id: uuidv4(),
    val: randomVal,
    x: random % GRID_SIZE,
    y: Math.floor(random / GRID_SIZE),
    animation: Animation.NEW,
  });

  return nextGame;
};

export const slideRtoL = (game: Game): State => {
  return processHorizontalMove(game, Direction.LEFT);
};

export const slideLtoR = (game: Game): State => {
  return processHorizontalMove(game, Direction.RIGHT);
};

export const slideDtoU = (game: Game): State => {
  return processVerticalMove(game, Direction.UP);
};

export const slideUtoD = (game: Game): State => {
  return processVerticalMove(game, Direction.DOWN);
};
