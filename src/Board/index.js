import React, { useState } from "react";
import Checker from "../Checker";

import "./Board.css";

const Board = ({ board, handleSquareClick }) => {
  const [piece, setPiece] = useState(null)
  const [nonPieceSquare, setNonPieceSquare] = useState(null)

  const callHandleMove = ({color, row, col}) => {
    // if you clicked on a checkers piece
    if (color) {
      if (piece) {
        // if you have already clicked on a checkers piece then reset
        setPiece(null)
        setNonPieceSquare(null)
      } else {
        setPiece({color: color, row: row, col: col})
      }
    } else {
      // if you clicked an empty square
      if (!piece) {
        // but you haven't selected a checkers piece yet; therefore reset
        setPiece(null)
        setNonPieceSquare(null)
      } else {
        handleSquareClick(piece, {color: color, row: row, col: col})

        setPiece(null)
        setNonPieceSquare(null)
      }
    }
  }

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((square, colIndex) => (
            <Square
              color={square}
              row={rowIndex}
              col={colIndex}
              handleClick={callHandleMove}
              key={colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const Square = ({ color, row, col, handleClick }) => {
  const backgroundColor = (row + col) % 2 === 0 ? "white" : "tan";

  let actuallyColor = null
  if (color) {
    if (color === 'human') {
      actuallyColor = 'red'
    } else if (color === 'computer') {
      actuallyColor = 'black'
    } else if (color === 'humanKing') {
      actuallyColor = 'red-king'
    } else {
      actuallyColor = 'black-king'
    }
  }
  
  return (
    <div
      className={`square`}
      style={{ backgroundColor }}
      onClick={() => handleClick({color, row, col})}
    >
      {color ? <Checker color={actuallyColor} /> : null}
    </div>
  );
};

export default Board;
