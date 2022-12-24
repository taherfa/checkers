import React from 'react';

const GameStatus = ({ outcome }) => {
  return (
    <div>
      <h1>{!outcome ? `Checkers` : outcome === `computer` ? `${outcome} wins!`: `You win!`}</h1>
    </div>
  );
};

export default GameStatus;