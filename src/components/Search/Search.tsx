import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/Search.svg';

interface SearchProps {
  ariaLabel: string;
  onSearch: (value: string) => void;
  placeholder: string;
  value: string;
}

const Search: React.FC<SearchProps> = ({ ariaLabel, onSearch, placeholder, value }) => {

  return (
    <div className='search'>
      <div className='search__icon'>
        <SearchIcon />
      </div>
      <input
        type='search'
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
      <div aria-hidden='true' className='search__line'></div>
    </div>
  );
};

export default Search;
