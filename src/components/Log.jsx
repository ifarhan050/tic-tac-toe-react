import React from 'react'

function Log({turns}) {
  return (
   <ol className='game-log'>
        {turns.map((turn, index) => (
        <li key={index}>{turn.player} Selected {turn.location.row}, {turn.location.col}</li>
        ))}
   </ol>
  )
}

export default Log