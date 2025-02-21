import React,{useState} from 'react'

function Gameboard({board, onSelectSquare}) {
  
  return (
    <ol id='game-board'>
        {board.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, cellIndex) => (
                        <li key={cellIndex}>
                            <button disabled={playerSymbol !== null} onClick={() => onSelectSquare(rowIndex, cellIndex)}>{playerSymbol}</button>
                        </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>
  )
}

export default Gameboard