import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeCountry } from '../../features/search/searchSlice';
import SearchBar from '../../components/searchBar/SearchBar';
import SortButton from '../../components/SortButton/SortButton'; // Import the SortButton component

const ListingPage = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedData, setSortedData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const dispatch = useDispatch();

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

  const filteredData = sortedData.filter(item => 
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

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {/* Render the SortButton component */}
      <SortButton onClick={toggleSorting} isAscending={isAscending} />

      <ul>
        {filteredData.map((item, index) => (
          <li key={item.name}>
            <a href={item.web_pages[0]} target="_blank" rel="noopener noreferrer">{item.name}</a>
            <button onClick={() => handleRemove(item.domains)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingPage;
