import React from "react";

const GameStatus = ({ outcome }) => {
  return (
    <div>
      {!outcome ? (
        <h2>Checkers</h2>
      ) : (
        <h1>{outcome === `computer` ? `${outcome} wins!` : `You win!`}</h1>
      )}
    </div>
  );
};

export default GameStatus;
