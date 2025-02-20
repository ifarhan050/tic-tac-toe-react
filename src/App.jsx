import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";

function App() {
  const [activePlayer, setActivePlayer]=useState('X');

  const handleActivePlayerChange = () => {
    setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X');
  };
  return <div id="game-container">
    <ol id="players" className="highlight-player">
     <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
     <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
    </ol>
    <Gameboard activePlayer={activePlayer} onActivePlayerChange={handleActivePlayerChange} />
  </div>;
}

export default App;
