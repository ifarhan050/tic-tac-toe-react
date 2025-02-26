import React, {useState} from 'react'

function Player({playerInfo,setPlayer,isActive}) {
 
  const [isEditing, setIsEditing] = useState(false)
  const handleEditClick = () => {   
    setIsEditing((editing)=>!editing)
  }
  return (
    <li  className={isActive?'active':undefined}>
    <span className="player">
      {isEditing?<input type="text" value={playerInfo.name} onChange={(e)=>{setPlayer({...playerInfo,name:e.target.value})}}/>:<span className="player-name">{playerInfo.name}</span>}
      {isEditing?<input type="text" value={playerInfo.symbol}  onChange={(e)=>{setPlayer({...playerInfo,symbol:e.target.value})}}/>:<span className="player-symbol">{playerInfo.symbol}</span>}
    </span>
    <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
  </li>
  )
}

export default Player