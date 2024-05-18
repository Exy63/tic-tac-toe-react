import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { useState } from 'react';
import { INITAL_PLAYERS, O_SYMBOL, X_SYMBOL } from './constants';
import { deriveActivePlayer, deriveWinner, deriveGameBoard } from './helpers';

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(INITAL_PLAYERS);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerNames);
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
            initialName={INITAL_PLAYERS[X_SYMBOL]}
            symbol={X_SYMBOL}
            isActive={activePlayer === X_SYMBOL}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={INITAL_PLAYERS[O_SYMBOL]}
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
