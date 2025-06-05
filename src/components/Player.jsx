import {useState} from "react";

export default function Player ({name, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(prev => !prev);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    };

    const handleNameEdit = (e) => {
        setPlayerName(e.target.value);
    };
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {!isEditing && <span className="player-name">{playerName}</span>}
                {isEditing && <input type='text' className="player-name" value={playerName} onChange={handleNameEdit} required />}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}