import React, { useState } from 'react';

interface SearchProps {
  value: string;
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ value, onSearch }) => {

  return (
    <div>
      <input
        type="search"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search for a city"
        aria-label="Search for a city"
      />
    </div>
  );
};

export default Search;
