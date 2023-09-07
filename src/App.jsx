import { useState } from "react";
import { TURNS } from "./components/Constants";
import { Button } from "./components/UI/Button";

import { Square } from "./components/UI/Square";
import { WinnerModal } from "./components/winnerModal";
import { Turn } from "./components/UI/Turn";

import { checkWinner } from "./components/Logic/Checkers";
import { checkEndGame } from "./components/Logic/Checkers";

import confetti from "canvas-confetti";
import "./App.css";
import { Board } from "./components/UI/Board";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  // const [board, setBoard] = useState(Array(9).fill(null));
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  // const [turn, setTurn] = useState(TURNS.X);
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    //Refresh board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //Change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Save game
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", JSON.stringify(newTurn));

    //Check winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  return (
    <main className="board">
      <Header />
      {/* <h1>TIC TAC TOE</h1> */}
      <Board board={board} updateBoard={updateBoard} />
      <Turn turn={turn} />
      <Button resetGame={resetGame} />

      <WinnerModal resetGame={resetGame} winner={winner} />
      <Footer />
    </main>
  );
}

export default App;
