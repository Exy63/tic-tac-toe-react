export default function Log({ turns, players }) {
  return (
    <ol id="log">
      {turns.map(({ square, player }) => (
        <li key={`${square.rowIdx}${square.colIdx}`}>
          {players[player]} selected {square.rowIdx}, {square.colIdx}
        </li>
      ))}
    </ol>
  );
}
