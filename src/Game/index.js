import React, { useState } from "react";
import Board from "../Board";
import GameStatus from "../GameStatus";
import { initialBoardState } from "../Utility";
import {handleMove} from "./Helpers/Interactions"
import "./Game.css";

const Game = () => {
  const [gameState, setGameState] = useState({
    board: initialBoardState, // 2D array representing the game board
    outcome: null, // 'human', 'computer', or null if the game is still ongoing
  });

  const handleSquareClick = (start, end) => {
    handleMove(start, end, gameState, setGameState)
  }

  return (
    <div className="container">
      <GameStatus outcome={gameState.outcome} />
      <Board board={gameState.board} handleSquareClick={handleSquareClick} />
    </div>
  );
};

export default Game;
