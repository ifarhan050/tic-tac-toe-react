import React, {useState} from 'react'

function Player({initialName,symbol,isActive}) {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false)
  const handleEditClick = () => {   
    setIsEditing((editing)=>!editing)
  }
  const handleSaveClick = (e) => {
    setName(e.target.value);
  }
  return (
    <li  className={isActive?'active':undefined}>
    <span className="player">
      {isEditing?<input type="text" value={name} onChange={handleSaveClick}/>:<span className="player-name">{name}</span>}
      <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
  </li>
  )
}

export default Player