import React, { useState } from "react";
import Checker from "../Checker";
import { callHandleMove, mapPieceToColor } from "./Helpers";

import "./Board.css";

const Board = ({ board, handleSquareClick }) => {
  const [piece, setPiece] = useState(null);

  const handleClick = ({ color, row, col }) => {
    callHandleMove({ color, row, col }, piece, setPiece, handleSquareClick);
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((square, colIndex) => (
            <Square
              color={square}
              row={rowIndex}
              col={colIndex}
              handleClick={handleClick}
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

  let checkerColor = mapPieceToColor(color);

  return (
    <div
      className={`square`}
      style={{ backgroundColor }}
      onClick={() => handleClick({ color, row, col })}
    >
      {color ? <Checker color={checkerColor} /> : null}
    </div>
  );
};

export default Board;
