import React from 'react';

const GameStatus = ({ outcome, turn }) => {
  return (
    <div>
      <h1>{!outcome ? `${turn}'s turn` : `${outcome} wins!`}</h1>
    </div>
  );
};

export default GameStatus;