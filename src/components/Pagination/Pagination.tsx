import React from 'react';

interface PaginationProps {
  children: React.ReactNode;
  ariaLabel: string;
  variant?: string;
}

const Pagination: React.FC<PaginationProps> = ({ children, ariaLabel, variant }) => {
  return (
    <nav
      aria-label={ariaLabel}
      className={`pagination ${variant} border-y border-salt-700 gap-x-8 text-salt-800 bg-salt-200 flex leading-none -mt-px px-5 py-3.5 relative w-full justify-between z-[1]`}>
      {children}
    </nav>
  );
};

export default Pagination;
