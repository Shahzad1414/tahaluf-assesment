import React from 'react';
import "./style.css";

const SortButton = ({ onClick, isAscending }) => {
  return (
    <div className='buttonContainer'>
    <button className='sortbutton' onClick={onClick}>
      {isAscending ? 'Sort A-Z' : 'Sort Z-A'}
    </button>
    </div>
  );
};

export default SortButton;
