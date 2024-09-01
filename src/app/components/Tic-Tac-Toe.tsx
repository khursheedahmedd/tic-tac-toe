"use client";

import { useState } from "react";

type Player = "X" | "O" | null;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick = (index: number) => {
    const newBoard = [...board];
    if (calculateWinner(board) || newBoard[index]) return;
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index: number) => {
    return (
      <button
        className="w-16 h-16 border border-gray-500 text-2xl flex items-center justify-center"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="text-2xl mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => renderSquare(index))}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Reset Game
      </button>
    </div>
  );
};

function calculateWinner(squares: Player[]): Player {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
