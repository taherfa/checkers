export const isGameOver = (board) => {
    // Check if one player has no more checkers left
    let humanCheckers = 0;
    let computerCheckers = 0;
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (board[row][col] === "human" || board[row][col] === "humanKing") {
          humanCheckers++;
        } else if (
          board[row][col] === "computer" ||
          board[row][col] === "computerKing"
        ) {
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

  export const getPossibleMoves = (row, col, board) => {
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
      if (row < board.length - 1 && col > 0 && board[row + 1][col - 1] === null) {
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
  