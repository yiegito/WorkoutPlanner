// SearchBar.js
import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { dispatch } = useWorkoutsContext();

  //can delete
//   const handleSearch = () => {
//     dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
//   };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    dispatch({ type: 'SET_SEARCH_QUERY', payload: value });
  };

  return (
    <div className='search'>
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={handleInputChange}
      />
      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
};

export default SearchBar;
