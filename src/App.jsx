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
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
          />
        </ol>
        <GameBoard onChangeTurn={handleChangeTurn} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
