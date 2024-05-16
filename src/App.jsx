import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { useState } from 'react';

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if (gameTurns.length && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  let currentPlayer = deriveActivePlayer(gameTurns);

  const handleChangeTurn = (rowIdx, colIdx) => {
    setGameTurns((prevTurns) => {
      let player = deriveActivePlayer(prevTurns);

      const updatedGameTurns = [
        { square: { rowIdx, colIdx }, player },
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
            symbol="X"
            isActive={currentPlayer === 'X'}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={currentPlayer === 'O'}
          />
        </ol>
        <GameBoard onChangeTurn={handleChangeTurn} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
