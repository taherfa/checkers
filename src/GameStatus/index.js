import React from 'react';

const GameStatus = ({ outcome, turn }) => {
  return (
    <div>
      {turn ? `${turn}'s turn` : outcome}
    </div>
  );
};

export default GameStatus;