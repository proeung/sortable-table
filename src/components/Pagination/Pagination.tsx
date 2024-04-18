import React from 'react';

interface PaginationProps {
  children: React.ReactNode;
  ariaLabel: string;
}

const Pagination: React.FC<PaginationProps> = ({
  children,
  ariaLabel
}) => {
  return (
    <nav
      aria-label={ariaLabel}
      className={`pagination border-y border-zinc-700 gap-x-8 text-zinc-800 bg-slate-100 flex leading-none -mt-px px-5 py-3.5 relative w-full justify-between z-[1]`}>
      {children}
    </nav>
  );
};

export default Pagination;
