export const callHandleMove = (
  { color, row, col },
  piece,
  setPiece,
  handleSquareClick
) => {
  // if you clicked on a checkers piece
  if (color) {
    if (piece) {
      // if you have already clicked on a checkers piece then reset
      setPiece(null);
    } else {
      setPiece({ color: color, row: row, col: col });
    }
  } else {
    // if you clicked an empty square
    if (!piece) {
      // but you haven't selected a checkers piece yet; therefore reset
      setPiece(null);
    } else {
      // you clicked a checkers piece, then a empty square. This is the correct order; call handleSquareClick
      handleSquareClick(piece, { color: color, row: row, col: col });

      setPiece(null);
    }
  }
};

export const mapPieceToColor = (piece) => {
  let color = null;
  if (piece) {
    if (piece === "human") {
      color = "red";
    } else if (piece === "computer") {
      color = "black";
    } else if (piece === "humanKing") {
      color = "red-king";
    } else {
      color = "black-king";
    }
  }
  return color;
};
