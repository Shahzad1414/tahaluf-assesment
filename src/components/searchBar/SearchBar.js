import React, { useState } from "react";
import "./style.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle changes in the search query
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Call the callback function passed from the parent component
    onSearch(value);
  };

  return (
    <div className="form-search">
        <input
          type="search"
          name="search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Enter University Name..."
        />
    </div>
  );
};

export default SearchBar;
