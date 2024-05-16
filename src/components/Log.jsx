export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map(({ square, player }) => (
        <li key={`${square.rowIdx}${square.colIdx}`}>
          {player} selected {square.rowIdx}, {square.colIdx}
        </li>
      ))}
    </ol>
  );
}
