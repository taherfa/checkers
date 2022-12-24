import { getPossibleMoves, selectBestMove } from "./Helpers";

export function getNextMove(board) {
  const moves = getPossibleMoves(board);
  if (moves == null) {
    return null;
  }

  let pieceType = board[moves[0].startRow][moves[0].startCol];
  const bestMove = selectBestMove(moves, board, pieceType);
  if (!bestMove) {
    return null;
  }

  // if a piece can be captured
  if (Math.abs(bestMove.startRow - bestMove.row) === 2) {
    const enemyRow = bestMove.startRow + (bestMove.row - bestMove.startRow) / 2;
    const enemyCol = bestMove.startCol + (bestMove.col - bestMove.startCol) / 2;
    board[enemyRow][enemyCol] = null;
  }

  return {
    start: { row: bestMove.startRow, col: bestMove.startCol },
    end: { row: bestMove.row, col: bestMove.col },
    color: board[bestMove.startRow][bestMove.startCol],
  };
}
