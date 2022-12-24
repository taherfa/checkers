import { getNextMove } from "../../ComputerAI";
import { isGameOver } from "../GameState";

export const handleMove = (start, end, gameState, setGameState) => {
  // Make a copy of the current game state
  const newGameState = { ...gameState };

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
    newGameState.outcome = "human";
    setGameState(newGameState);
    return;
  }
  // Use the ComputerAI component to generate the computer's move
  const computerMove = getNextMove(newGameState.board);

  if (!computerMove) {
    newGameState.outcome = "human";
    setGameState(newGameState);
    return;
  }

  // Update the board with the new positions of the checkers
  newGameState.board[computerMove.start.row][computerMove.start.col] = null;

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
  }

  // Update the game state
  setGameState(newGameState);
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