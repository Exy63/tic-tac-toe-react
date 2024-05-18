import { X_SYMBOL, O_SYMBOL } from './constants';

export const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = X_SYMBOL;

  if (gameTurns.length && gameTurns[0].player === X_SYMBOL) {
    currentPlayer = O_SYMBOL;
  }
  return currentPlayer;
};
