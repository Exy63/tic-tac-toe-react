import {
  X_SYMBOL,
  O_SYMBOL,
  WINNING_COMBINATIONS,
  INITIAL_GAME_BOARD,
} from './constants';

export const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = X_SYMBOL;

  if (gameTurns.length && gameTurns[0].player === X_SYMBOL) {
    currentPlayer = O_SYMBOL;
  }
  return currentPlayer;
};

export const deriveWinner = (gameBoard, playerNames) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const [firstSquareSymbol, secondSquareSymbol, thirdSquareSymbol] = [
      gameBoard[combination[0].row][combination[0].column],
      gameBoard[combination[1].row][combination[1].column],
      gameBoard[combination[2].row][combination[2].column],
    ];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerNames[firstSquareSymbol];
    }
  }

  return winner;
};

export const deriveGameBoard = (gameTurns) => {
  const gameBoard = [...INITIAL_GAME_BOARD.map((el) => [...el])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { rowIdx, colIdx } = square;

    gameBoard[rowIdx][colIdx] = player;
  }

  return gameBoard;
};
