import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import GameOver from "./components/GameOver";

const initialgameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];



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

  const [player1, setPlayer1] = useState({
    name:"Player 1",
    symbol:"X"
  });
  const [player2, setPlayer2] = useState({
    name:"Player 2",
    symbol:"O"
  });

  const switchPlayer = (turns) => {
    let currentPlayer = player1.symbol;
    if (turns.length > 0 && turns[0].player === player1.symbol) {
      currentPlayer = player2.symbol;
    }
    return currentPlayer;
  };
  const gameboard = [...initialgameboard.map(row => [...row])];
  const [gametruns, setGameTurns] = useState([]);
  let winner = null;

  for (const turn of gametruns) {
    gameboard[turn.location.row][turn.location.col] = turn.player;
  }

  winner = checkWinner(gameboard);
  const draw = !winner && isDraw(gameboard);

  const activePlayer = winner || draw ? null : switchPlayer(gametruns);

  const handleSquareClick = (rowIndex, colIndex) => {
    //if (winner || draw || gameboard[rowIndex][colIndex]) return; // Prevent click if game is over or square is filled
    setGameTurns((prevtruns) => {
      const currentPlayer = switchPlayer(prevtruns);
      return [{ player: currentPlayer, location: { row: rowIndex, col: colIndex } }, ...prevtruns];
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  }

  return (
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player playerInfo={player1} setPlayer={setPlayer1} isActive={activePlayer === player1.symbol} />
        <Player playerInfo={player2} setPlayer={setPlayer2} isActive={activePlayer === player2.symbol} />
      </ol>
      {(winner || draw) && <GameOver winner={winner} onRestart={handleRestart} />}
      <Gameboard board={gameboard} onSelectSquare={handleSquareClick} />
      
    </div>
  );
}

export default App;

