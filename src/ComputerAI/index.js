function getPossibleMoves(board, color) {
  const possibleMoves = [];

  // Iterate through the board and find all checkers of the given color
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === color) {
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
        // Check if the checker can make any capturing moves
        if (canCapture(board, row, col, row - 2, col + 2)) {
          console.log("yessir");
          possibleMoves.push({
            startRow: row,
            startCol: col,
            row: row - 2,
            col: col + 2,
          });
        }
        if (canCapture(board, row, col, row - 2, col - 2)) {
          console.log("yessir");
          possibleMoves.push({
            startRow: row,
            startCol: col,
            row: row - 2,
            col: col - 2,
          });
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
  const enemyColor = "human";
  const enemyRow = row + (newRow - row) / 2;
  const enemyCol = col + (newCol - col) / 2;
  if (board[enemyRow][enemyCol] !== enemyColor) {
    return false;
  }
  return true;
};

function selectBestMove(moves) {
  // finds a move that results in the opponent's piece being captured
  for (const move of moves) {
    if (Math.abs(move.startRow - move.row) === 2) {
      return move;
    }
  }

  

  return moves[moves.length - 1];
}

export function getNextMove(board, color) {
  const moves = getPossibleMoves(board, color);
  const bestMove = selectBestMove(moves);

  if (!bestMove) {
    return null
  }

  if (Math.abs(bestMove.startRow - bestMove.row) === 2) {
    const enemyRow = bestMove.startRow + (bestMove.row - bestMove.startRow) / 2;
    const enemyCol = bestMove.startCol + (bestMove.col - bestMove.startCol) / 2;
    console.log(enemyRow, enemyCol)
    board[enemyRow][enemyCol] = null
    
    return {
      start: { row: bestMove.startRow, col: bestMove.startCol },
      end: { row: bestMove.row, col: bestMove.col },
    };
  } else {
    return {
      start: { row: bestMove.startRow, col: bestMove.startCol },
      end: { row: bestMove.row, col: bestMove.col },
    };
  }
}
