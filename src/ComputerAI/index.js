import _ from "lodash";

function getPossibleMoves(board) {
  const possibleMoves = [];

  // Iterate through the board and find all checkers of the given color
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        board[row][col] === "computer" ||
        board[row][col] === "computerKing"
      ) {
        // Check if the checker can make any non-capturing moves
        if (canMove(board, row, col, row - 1, col + 1)) {
          possibleMoves.push({
            startRow: row,
            startCol: col,
            row: row - 1,
            col: col + 1,
          });
        }
        if (canMove(board, row, col, row - 1, col - 1)) {
          possibleMoves.push({
            startRow: row,
            startCol: col,
            row: row - 1,
            col: col - 1,
          });
        }
        if (board[row][col] === "computerKing") {
          if (canMove(board, row, col, row + 1, col + 1)) {
            possibleMoves.push({
              startRow: row,
              startCol: col,
              row: row + 1,
              col: col + 1,
            });
          }
          if (canMove(board, row, col, row + 1, col - 1)) {
            possibleMoves.push({
              startRow: row,
              startCol: col,
              row: row + 1,
              col: col - 1,
            });
          }
        }

        // Check if the checker can make any capturing moves
        if (canCapture(board, row, col, row - 2, col + 2)) {
          possibleMoves.push({
            startRow: row,
            startCol: col,
            row: row - 2,
            col: col + 2,
          });
        }
        if (canCapture(board, row, col, row - 2, col - 2)) {
          possibleMoves.push({
            startRow: row,
            startCol: col,
            row: row - 2,
            col: col - 2,
          });
        }
        if (board[row][col] === "computerKing") {
          if (canCapture(board, row, col, row + 2, col + 2)) {
            possibleMoves.push({
              startRow: row,
              startCol: col,
              row: row + 2,
              col: col + 2,
            });
          }
          if (canCapture(board, row, col, row + 2, col - 2)) {
            possibleMoves.push({
              startRow: row,
              startCol: col,
              row: row + 2,
              col: col - 2,
            });
          }
        }
      }
    }
  }

  return possibleMoves;
}

const canMove = (board, row, col, newRow, newCol) => {
  // Check if the destination square is within the board boundaries
  if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
    return false;
  }
  // Check if the destination square is empty
  if (board[newRow][newCol] !== null) {
    return false;
  }
  // Check if the move is diagonal
  if (Math.abs(row - newRow) !== Math.abs(col - newCol)) {
    return false;
  }
  return true;
};

const canCapture = (board, row, col, newRow, newCol) => {
  // Check if the destination square is within the board boundaries
  if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
    return false;
  }
  // Check if the destination square is empty
  if (board[newRow][newCol] !== null) {
    return false;
  }
  // Check if the move is diagonal
  if (Math.abs(row - newRow) !== Math.abs(col - newCol)) {
    return false;
  }
  // Check if there is an enemy checker in the square between the current position and the destination
  const enemyRow = row + (newRow - row) / 2;
  const enemyCol = col + (newCol - col) / 2;
  if (
    board[enemyRow][enemyCol] !== "human" &&
    board[enemyRow][enemyCol] !== "humanKing"
  ) {
    return false;
  }
  return true;
};

function selectBestMove(moves, board, pieceType) {
  console.log("all", moves);
  // finds a move that results in the opponent's piece being captured
  for (const move of moves) {
    if (Math.abs(move.startRow - move.row) === 2) {
      return move;
    }
  }

  // Filter out moves that result in the checker being captured
  const safeMoves = moves.filter((move) => {
    // Make a copy of the board and make the move
    const testBoard = _.cloneDeep(board);
    testBoard[move.startRow][move.startCol] = null;
    testBoard[move.row][move.col] = pieceType;

    // Check if the checker would be captured after making the move
    return !isCheckerCaptured(testBoard, move.row, move.col);
  });

  console.log("safe", safeMoves);

  // If there are no safe moves, return the first move in the list
  if (safeMoves.length === 0) {
    return moves[0];
  }

  // Otherwise, choose a random safe move
  const index = Math.floor(Math.random() * safeMoves.length);
  return safeMoves[index];
}

const isCheckerCaptured = (board, row, col) => {
  // Check if the checker can be captured by an opposing checker moving diagonally to an adjacent square
  const opposingColor = "human";
  if (
    row > 0 &&
    col > 0 &&
    row < 7 &&
    col < 7 &&
    board[row - 1][col - 1] === opposingColor &&
    board[row + 1][col + 1] === null
  ) {
    return true;
  }
  if (
    row > 0 &&
    col > 0 &&
    row < 7 &&
    col < 7 &&
    board[row - 1][col + 1] === opposingColor &&
    board[row + 1][col - 1] === null
  ) {
    return true;
  }

  // Check if the checker can be captured by an opposing king moving diagonally to an adjacent square
  // if (
  //   row > 0 &&
  //   col > 0 &&
  //   row < 7 &&
  //   col < 7 &&
  //   board[row - 1][col - 1] === `${opposingColor}king` &&
  //   board[row + 1][col + 1] === null
  // ) {
  //   return true;
  // }
  // if (
  //   row > 0 &&
  //   col > 0 &&
  //   row < 7 &&
  //   col < 7 &&
  //   board[row - 1][col + 1] === `${opposingColor}king` &&
  //   board[row + 1][col - 1] === null
  // ) {
  //   return true;
  // }
  // if (
  //   row > 0 &&
  //   col > 0 &&
  //   row < 7 &&
  //   col < 7 &&
  //   board[row + 1][col - 1] === `${opposingColor}king` &&
  //   board[row - 1][col + 1] === null
  // ) {
  //   return true;
  // }
  // if (
  //   row > 0 &&
  //   col > 0 &&
  //   row < 7 &&
  //   col < 7 &&
  //   board[row + 1][col + 1] === `${opposingColor}king` &&
  //   board[row - 1][col - 1] === null
  // ) {
  //   return true;
  // }

  return false;
};

export function getNextMove(board) {
  const moves = getPossibleMoves(board);
  let pieceType = board[moves[0].startRow][moves[0].startCol];
  const bestMove = selectBestMove(moves, board, pieceType);

  if (!bestMove) {
    return null;
  }

  if (Math.abs(bestMove.startRow - bestMove.row) === 2) {
    const enemyRow = bestMove.startRow + (bestMove.row - bestMove.startRow) / 2;
    const enemyCol = bestMove.startCol + (bestMove.col - bestMove.startCol) / 2;
    board[enemyRow][enemyCol] = null;

    return {
      start: { row: bestMove.startRow, col: bestMove.startCol },
      end: { row: bestMove.row, col: bestMove.col },
      color: board[bestMove.startRow][bestMove.startCol],
    };
  } else {
    return {
      start: { row: bestMove.startRow, col: bestMove.startCol },
      end: { row: bestMove.row, col: bestMove.col },
      color: board[bestMove.startRow][bestMove.startCol],
    };
  }
}
