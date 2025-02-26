import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import GameOver from "./components/GameOver";

const createInitialGameboard = (size) => {
  return Array(size).fill().map(() => Array(size).fill(null));
};

const checkWinner = (board) => {
  const size = board.length;
  const lines = [];

  // Rows and Columns
  for (let i = 0; i < size; i++) {
    lines.push(
      Array(size).fill().map((_, j) => ({ r: i, c: j })), // Row
      Array(size).fill().map((_, j) => ({ r: j, c: i }))  // Column
    );
  }

  // Diagonals
  lines.push(
    Array(size).fill().map((_, i) => ({ r: i, c: i })),       // Main diagonal
    Array(size).fill().map((_, i) => ({ r: i, c: size - 1 - i })) // Anti-diagonal
  );

  for (const line of lines) {
    const [first, ...rest] = line;
    if (
      board[first.r][first.c] &&
      rest.every(({ r, c }) => board[r][c] === board[first.r][first.c])
    ) {
      return board[first.r][first.c];
    }
  }
  return null;
};

const isDraw = (board) => {
  return board.every(row => row.every(cell => cell !== null));
};

function App() {
  const [player1, setPlayer1] = useState({
    name: "Player 1",
    symbol: "X"
  });
  const [player2, setPlayer2] = useState({
    name: "Player 2",
    symbol: "O"
  });

  const [boardSize, setBoardSize] = useState(3); // Default to 3x3
  const gameboard = createInitialGameboard(boardSize);
  const [gameTurns, setGameTurns] = useState([]);
  let winner = null;

  for (const turn of gameTurns) {
    gameboard[turn.location.row][turn.location.col] = turn.player;
  }

  winner = checkWinner(gameboard);
  const draw = !winner && isDraw(gameboard);

  const switchPlayer = (turns) => {
    let currentPlayer = player1.symbol;
    if (turns.length > 0 && turns[0].player === player1.symbol) {
      currentPlayer = player2.symbol;
    }
    return currentPlayer;
  };

  const activePlayer = winner || draw ? null : switchPlayer(gameTurns);

  
  const handleSquareClick = (rowIndex, colIndex) => {
    if (winner || draw || gameboard[rowIndex][colIndex]) return; // Prevent click if game is over or square is filled
    setGameTurns((prevTurns) => {
      const currentPlayer = switchPlayer(prevTurns);
      return [{ player: currentPlayer, location: { row: rowIndex, col: colIndex } }, ...prevTurns];
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  return (
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player playerInfo={player1} setPlayer={setPlayer1} isActive={activePlayer === player1.symbol} />
        <Player playerInfo={player2} setPlayer={setPlayer2} isActive={activePlayer === player2.symbol} />
      </ol>
      {(winner || draw) && <GameOver winner={winner} onRestart={handleRestart} />}
      <Gameboard board={gameboard} onSelectSquare={handleSquareClick} />
      <div>
        <label>
          Board Size:
          <input type="number" min="3" max="10" value={boardSize} onChange={(e) => setBoardSize(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
}

export default App;

