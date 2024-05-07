import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeCountry } from "../../features/search/searchSlice";
import SearchBar from "../../components/searchBar/SearchBar";
import SortButton from "../../components/sortButton/SortButton";
import { useNavigate } from "react-router-dom";
import "./style.css";
const ListingPage = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return isAscending ? -1 : 1;
      }
      if (nameA > nameB) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sorted);
  }, [data, isAscending]);

  const filteredData = sortedData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSorting = () => {
    setIsAscending(!isAscending);
  };

  const handleRemove = (domainName) => {
    dispatch(removeCountry(domainName));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRedirect = (detailObject) => {
    navigate("/detail", { state: { detailObject } });
  };

  return (
    <div className="mainContainer">
      <SearchBar onSearch={handleSearch} />
      {/* Render the SortButton component */}
      <SortButton onClick={toggleSorting} isAscending={isAscending} />

      <div className="listContainer">
        {filteredData.map((item, index) => (
          <div className="item" key={item.name}>
            <span className="label">{item.alpha_two_code}</span>
            <p
              onClick={() => handleRedirect(item)}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {item.name}
            </p>
            <button
              className="removebtn"
              onClick={() => handleRemove(item.domains)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
