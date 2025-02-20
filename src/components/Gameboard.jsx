import React,{useState} from 'react'
const initialgameboard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
function Gameboard({activePlayer, onActivePlayerChange}) {
  const [gameboard, setGameboard] = useState(initialgameboard)

  const handleCellClick = (rowIndex, cellIndex) => {
    const updatedGameboard = gameboard.map((row, rIndex) => {
        if (rIndex === rowIndex) {
            return row.map((cell, cIndex) => {
                if (cIndex === cellIndex) {
                    return activePlayer
                }
                return cell
            })
        }
        return row
    })
    setGameboard(updatedGameboard)
    onActivePlayerChange();
  }
  return (
    <ol id='game-board'>
        {gameboard.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, cellIndex) => (
                        <li key={cellIndex}>
                            <button onClick={() => handleCellClick(rowIndex, cellIndex)}>{playerSymbol}</button>
                        </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>
  )
}

export default Gameboard