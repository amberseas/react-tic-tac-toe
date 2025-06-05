import {useState} from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import Player from "./components/Player";
import {WINNING_COMBINATIONS} from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer (gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App () {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(inner => [...inner])]; //deep copy not to mutate initial gameboard
  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    let squareSymbols = [null, null, null];
    for (let i = 0; i < squareSymbols.length; i++) {
      squareSymbols[i] = gameBoard[combination[i].row][combination[i].column];
    }
    let joinedLine = squareSymbols.join("");
    if (joinedLine === "XXX") {
      winner = "X";
    } else if (joinedLine === "OOO") {
      winner = "O";
    }
  }

  const hasDraw = gameTurns.length === 9;

  function handleSelectSquare (rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart () {
    setGameTurns([]);
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className="highlight-player">
          <Player name='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player name='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
