import React from 'react';

interface PaginationPerPageSelectFieldProps {
  perPage: number;
  onChange: (perPage: number) => void; // Assuming you want to handle changes
}

const PaginationPerPageSelectField: React.FC<PaginationPerPageSelectFieldProps> = ({ perPage, onChange }) => {
  return (
    <div className='pagination-perpage'>
      <label htmlFor="perPageSelect">Per page:</label>
      <select value={perPage} onChange={(e) => onChange(parseInt(e.target.value, 10))}>
        {[10, 25, 50, 100, 150].map(size => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaginationPerPageSelectField;
