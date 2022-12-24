import React from 'react';

const GameStatus = ({ outcome }) => {
  return (
    <div>
      <h1>{!outcome ? `Checkers` : `${outcome} wins!`}</h1>
    </div>
  );
};

export default GameStatus;