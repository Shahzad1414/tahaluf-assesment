import React from 'react';

const SortButton = ({ onClick, isAscending }) => {
  return (
    <button onClick={onClick}>
      {isAscending ? 'Sort A-Z' : 'Sort Z-A'}
    </button>
  );
};

export default SortButton;
