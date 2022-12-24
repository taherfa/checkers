import React, { useState } from "react";
import Board from "../Board";
import GameStatus from "../GameStatus";
import { getNextMove } from "../ComputerAI";
import './Game.css'

const Game = () => {
  const [gameState, setGameState] = useState({
    board: [
      ["human", null, "human", null, "human", null, "human", null],
      [null, "human", null, "human", null, "human", null, "human"],
      ["human", null, "human", null, "human", null, "human", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, "computer", null, "computer", null, "computer", null, "computer"],
      ["computer", null, "computer", null, "computer", null, "computer", null],
      [null, "computer", null, "computer", null, "computer", null, "computer"],
    ], // 2D array representing the game board
    turn: "human", // 'human' or 'computer'
    outcome: null, // 'human', 'computer', or null if the game is still ongoing
  });

  const handleMove = (start, end) => {
    // Make a copy of the current game state
    const newGameState = { ...gameState };

    // Validate the move
    // Check if it's the correct player's turn
    if (newGameState.turn !== "human" && newGameState.turn !== "humanKing") {
      // Display an error message or do something else to indicate that it's not the correct player's turn
      return;
    }

    if (newGameState.turn === "human") {
      // Validate the move for the human player
      if (!isValidMove(start, end, newGameState.board)) {
        // Display an error message or do something else to indicate that the move is not valid
        return;
      }

      // Update the board with the new positions of the checkers
      newGameState.board[start.row][start.col] = null;

      if (end.row === 7) {
        newGameState.board[end.row][end.col] = "humanKing";
      } else {
        newGameState.board[end.row][end.col] = start.color;
      }

      // Check if the game is over
      if (isGameOver(newGameState.board)) {
        newGameState.outcome = newGameState.turn;
      } else {
        // Use the ComputerAI component to generate the computer's move
        const computerMove = getNextMove(newGameState.board);

        if (!computerMove) {
          newGameState.outcome = "human";
          setGameState(newGameState);
          return;
        }

        // Update the board with the new positions of the checkers
        newGameState.board[computerMove.start.row][computerMove.start.col] =
          null;

        if (computerMove.end.row === 0) {
          newGameState.board[computerMove.end.row][computerMove.end.col] =
            "computerKing";
        } else {
          newGameState.board[computerMove.end.row][computerMove.end.col] =
            computerMove.color;
        }

        // Check if the game is over
        if (isGameOver(newGameState.board)) {
          newGameState.outcome = "computer";
        } else {
          // Switch turns back to the human player
          newGameState.turn = "human";
        }
      }

      // Update the game state
      setGameState(newGameState);
    }
  };

  const isValidMove = (start, end, board) => {
    // Check if the start and end positions are within the bounds of the board
    if (
      start.row < 0 ||
      start.row >= board.length ||
      start.col < 0 ||
      start.col >= board[0].length ||
      end.row < 0 ||
      end.row >= board.length ||
      end.col < 0 ||
      end.col >= board[0].length
    ) {
      return false;
    }

    // Check if the start position is occupied by a checker of the correct color
    if (board[start.row][start.col] !== start.color) {
      return false;
    }

    // Check if the end position is empty
    if (board[end.row][end.col] !== null) {
      return false;
    }

    // Check if the move is a single space diagonal move (for king checkers moves)
    if (board[start.row][start.col] === "humanKing") {
      if (
        Math.abs(end.row - start.row) === 1 &&
        Math.abs(start.col - end.col) === 1
      ) {
        return true;
      }
    } else {
      // Check if the move is a single space diagonal move forward (for regular checkers moves)
      if (end.row - start.row === 1 && Math.abs(start.col - end.col) === 1) {
        return true;
      }
    }

    // Check if the move is a jump over an opponent's checker (for king checker captures)
    if (board[start.row][start.col] === "humanKing") {
      if (
        Math.abs(end.row - start.row) === 2 &&
        Math.abs(start.col - end.col) === 2
      ) {
        // Check if there is an opponent's checker in the middle position
        const middleRow = (start.row + end.row) / 2;
        const middleCol = (start.col + end.col) / 2;
        if (
          board[middleRow][middleCol] === null ||
          board[middleRow][middleCol] === start.color
        ) {
          return false;
        }
        // eliminate the piece you jumped over
        board[middleRow][middleCol] = null;
        return true;
      }
    } else {
      // Check if the move is a jump over an opponent's checker forward (for regular checker captures)
      if (end.row - start.row === 2 && Math.abs(start.col - end.col) === 2) {
        // Check if there is an opponent's checker in the middle position
        const middleRow = (start.row + end.row) / 2;
        const middleCol = (start.col + end.col) / 2;
        if (
          board[middleRow][middleCol] === null ||
          board[middleRow][middleCol] === start.color
        ) {
          return false;
        }
        // eliminate the piece you jumped over
        board[middleRow][middleCol] = null;
        return true;
      }
    }

    // If the move is none of the above, it is not valid
    return false;
  };

  const isGameOver = (board) => {
    // Check if one player has no more checkers left
    let humanCheckers = 0;
    let computerCheckers = 0;
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (board[row][col] === "human" || board[row][col] === "humanKing") {
          humanCheckers++;
        } else if (board[row][col] === "computer" || board[row][col] === "computerKing") {
          computerCheckers++;
        }
      }
    }

    if (humanCheckers === 0 || computerCheckers === 0) {
      return true;
    }

    // Check if the other player has no more legal moves
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (board[row][col] !== null) {
          const moves = getPossibleMoves(row, col, board);
          if (moves.length > 0) {
            return false;
          }
        }
      }
    }

    // If none of the above conditions are met, the game is over
    return true;
  };

  const getPossibleMoves = (row, col, board) => {
    const color = board[row][col];
    const moves = [];

    // Check for regular single space diagonal moves
    if (color === "human" || board[row][col] === "humanKing") {
      // Check for moves to the top-left and top-right
      if (row > 0 && col > 0 && board[row - 1][col - 1] === null) {
        moves.push({ row: row - 1, col: col - 1 });
      }
      if (
        row > 0 &&
        col < board[0].length - 1 &&
        board[row - 1][col + 1] === null
      ) {
        moves.push({ row: row - 1, col: col + 1 });
      }
    }
    if (color === "computer" || board[row][col] === "computerKing") {
      // Check for moves to the bottom-left and bottom-right
      if (
        row < board.length - 1 &&
        col > 0 &&
        board[row + 1][col - 1] === null
      ) {
        moves.push({ row: row + 1, col: col - 1 });
      }
      if (
        row < board.length - 1 &&
        col < board[0].length - 1 &&
        board[row + 1][col + 1] === null
      ) {
        moves.push({ row: row + 1, col: col + 1 });
      }
    }

    // Check for captures
    if (color === "human" || board[row][col] === "humanKing") {
      // Check for captures to the top-left and top-right
      if (
        row > 1 &&
        col > 1 &&
        board[row - 1][col - 1] === "computer" &&
        board[row - 2][col - 2] === null
      ) {
        moves.push({ row: row - 2, col: col - 2 });
      }
      if (
        row > 1 &&
        col < board[0].length - 2 &&
        board[row - 1][col + 1] === "computer" &&
        board[row - 2][col + 2] === null
      ) {
        moves.push({ row: row - 2, col: col + 2 });
      }
    }
    if (color === "computer" || board[row][col] === "computerKing") {
      // Check for captures to the bottom-left and bottom-right
      if (
        row < board.length - 2 &&
        col > 1 &&
        board[row + 1][col - 1] === "human" &&
        board[row + 2][col - 2] === null
      ) {
        moves.push({ row: row + 2, col: col - 2 });
      }
      if (
        row < board.length - 2 &&
        col < board[0].length - 2 &&
        board[row + 1][col + 1] === "human" &&
        board[row + 2][col + 2] === null
      ) {
        moves.push({ row: row + 2, col: col + 2 });
      }
    }

    return moves;
  };

  return (
    <div className="container">
      <GameStatus outcome={gameState.outcome} turn={gameState.turn} />
      <Board board={gameState.board} handleSquareClick={handleMove} />
    </div>
  );
};

export default Game;
