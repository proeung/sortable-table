import React from 'react';
import { ReactComponent as CaretDown } from '../../assets/CaretDown.svg';

interface PaginationPerPageSelectFieldProps {
  perPage: number;
  onChange: (perPage: number) => void;
}

const PaginationPerPageSelectField: React.FC<PaginationPerPageSelectFieldProps> = ({ perPage, onChange }) => {
  return (
    <div className='gap-x-4 items-center grid grid-cols-[repeat(2,max-content)] text-salt-1000 text-md'>
      <div className='overflow-hidden relative rounded'>
        <select
          id='perPageSelect'
          value={perPage}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
        >
          {[10, 25, 50, 100, 150].map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <div className='absolute border-salt-700 border-t bottom-0 inset-x-0' aria-hidden="true"></div>
        <span className='absolute translate-x-[0%] -translate-y-2/4 right-2 top-2/4 pointer-events-none'>
          <CaretDown className='text-salt-700 fill-current' />
        </span>
      </div>
      <label htmlFor='perPageSelect' className='text-salt-1000'>Per page</label>
    </div>
  );
};

export default PaginationPerPageSelectField;
