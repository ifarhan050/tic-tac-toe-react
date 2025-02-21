import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";

const initialgameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const switchPlayer = (turns) => {
  let currentPlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
};

const checkWinner = (board) => {
  const lines = [
    // Rows
    [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }],
    [{ r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: 2 }],
    [{ r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }],
    // Columns
    [{ r: 0, c: 0 }, { r: 1, c: 0 }, { r: 2, c: 0 }],
    [{ r: 0, c: 1 }, { r: 1, c: 1 }, { r: 2, c: 1 }],
    [{ r: 0, c: 2 }, { r: 1, c: 2 }, { r: 2, c: 2 }],
    // Diagonals
    [{ r: 0, c: 0 }, { r: 1, c: 1 }, { r: 2, c: 2 }],
    [{ r: 0, c: 2 }, { r: 1, c: 1 }, { r: 2, c: 0 }]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (
      board[a.r][a.c] &&
      board[a.r][a.c] === board[b.r][b.c] &&
      board[a.r][a.c] === board[c.r][c.c]
    ) {
      return board[a.r][a.c];
    }
  }
  return null;
};

const isDraw = (board) => {
  return board.every(row => row.every(cell => cell !== null));
};

function App() {
  const gameboard = initialgameboard;
  const [gametruns, setGameTurns] = useState([]);
  let winner = null;

  for (const turn of gametruns) {
    gameboard[turn.location.row][turn.location.col] = turn.player;
  }

  winner = checkWinner(gameboard);
  const draw = !winner && isDraw(gameboard);

  const activePlayer = winner || draw ? null : switchPlayer(gametruns);

  const handleSquareClick = (rowIndex, colIndex) => {
    if (winner || draw || gameboard[rowIndex][colIndex]) return; // Prevent click if game is over or square is filled
    setGameTurns((prevtruns) => {
      const currentPlayer = switchPlayer(prevtruns);
      return [{ player: currentPlayer, location: { row: rowIndex, col: colIndex } }, ...prevtruns];
    });
  };

  return (
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
      </ol>
      <Gameboard board={gameboard} onSelectSquare={handleSquareClick} />
      {winner && <div id="game-over"><h2>{`Player ${winner} wins!`}</h2></div>}
      {draw && <div id="game-over"><h2>It's a draw!</h2></div>}
    </div>
  );
}

export default App;

