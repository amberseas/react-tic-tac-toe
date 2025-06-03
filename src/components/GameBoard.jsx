import {useState} from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard ({onSelectSquare, activeSymbol}) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare (rowIndex, squareIndex) {
        setGameBoard((prev) => {
            const newGameBoard = [...prev.map(innerArr => [...innerArr])];
            newGameBoard[rowIndex][squareIndex] = activeSymbol;
            return newGameBoard;
        });
        onSelectSquare();
    }
    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((square, squareIndex) => <li key={squareIndex}><button onClick={() => handleSelectSquare(rowIndex, squareIndex)}>{square}</button></li>)}
            </ol>
        </li>)}
    </ol>;
}