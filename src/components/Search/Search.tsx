import React from 'react';

interface SearchProps {
  ariaLabel: string;
  onSearch: (value: string) => void;
  placeholder: string;
  value: string;
}

const Search: React.FC<SearchProps> = ({ ariaLabel, onSearch, placeholder, value }) => {

  return (
    <div className='search'>
      <input
        type='search'
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </div>
  );
};

export default Search;
