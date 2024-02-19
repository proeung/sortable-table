import React from 'react';

interface PaginationPerPageSelectFieldProps {
  perPage: number;
  onChange: (perPage: number) => void; // Assuming you want to handle changes
}

const PaginationPerPageSelectField: React.FC<PaginationPerPageSelectFieldProps> = ({ perPage, onChange }) => {
  return (
    <select value={perPage} onChange={(e) => onChange(parseInt(e.target.value, 10))}>
      {[10, 20, 30, 40, 50, 60].map(size => (
        <option key={size} value={size}>
          {size} per page
        </option>
      ))}
    </select>
  );
};

export default PaginationPerPageSelectField;
