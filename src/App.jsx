import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { useState } from 'react';
import {
  O_SYMBOL,
  X_SYMBOL,
  WINNING_COMBINATIONS,
  initialPlayerName,
  initialGameBoard,
} from './constants';
import { deriveActivePlayer } from './helpers';

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    [X_SYMBOL]: `${initialPlayerName} 1`,
    [O_SYMBOL]: `${initialPlayerName} 2`,
  });

  const gameBoard = [...initialGameBoard.map((el) => [...el])];

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
      winner = playerNames[firstSquareSymbol];
    }
  }

  let hasDraw = gameTurns.length === 9 && !winner;

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

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayerNames((prevValue) => ({ ...prevValue, [symbol]: newName }));
  };

  console.log(playerNames)

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={playerNames[X_SYMBOL]}
            symbol={X_SYMBOL}
            isActive={activePlayer === X_SYMBOL}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={playerNames[O_SYMBOL]}
            symbol={O_SYMBOL}
            isActive={activePlayer === O_SYMBOL}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onChangeTurn={handleChangeTurn} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
