import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { useState } from 'react';
import { O_SYMBOL, X_SYMBOL, WINNING_COMBINATIONS } from './constants';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = X_SYMBOL;

  if (gameTurns.length && gameTurns[0].player === X_SYMBOL) {
    currentPlayer = O_SYMBOL;
  }
  return currentPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { rowIdx, colIdx } = square;

    gameBoard[rowIdx][colIdx] = player;
  }

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
      winner = firstSquareSymbol;
    }
  }

  let activePlayer = deriveActivePlayer(gameTurns);

  const handleChangeTurn = (rowIdx, colIdx) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedGameTurns = [
        { square: { rowIdx, colIdx }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedGameTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol={X_SYMBOL}
            isActive={activePlayer === X_SYMBOL}
          />
          <Player
            initialName="Player 2"
            symbol={O_SYMBOL}
            isActive={activePlayer === O_SYMBOL}
          />
        </ol>
        {winner && <p>You won, {winner}!</p>}
        <GameBoard onChangeTurn={handleChangeTurn} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
