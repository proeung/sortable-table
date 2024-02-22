import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/Search.svg';

interface SearchProps {
  ariaLabel: string;
  onSearch: (value: string) => void;
  placeholder: string;
  value: string;
}

const Search: React.FC<SearchProps> = ({
  ariaLabel,
  onSearch,
  placeholder,
  value
}) => {
  return (
    <div className='search mb-10 relative max-w-lg overflow-hidden rounded'>
      <div className='absolute translate-x-[0%] -translate-y-2/4 left-3 top-2/4 pointer-events-none'>
        <SearchIcon className='text-salt-800 fill-current' />
      </div>
      <input
        type='search'
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
      <div className='absolute border-salt-700 border-t bottom-0 inset-x-0' aria-hidden="true"></div>
    </div>
  );
};

export default Search;
