import React from 'react';

interface PaginationProps {
  children: React.ReactNode;
  ariaLabel: string;
  variant: string;
}

const Pagination: React.FC<PaginationProps> = ({ children, ariaLabel, variant }) => {
  return (
    <nav aria-label={ariaLabel} className={`pagination ${variant}`}>
      {children}
    </nav>
  );
};

export default Pagination;
