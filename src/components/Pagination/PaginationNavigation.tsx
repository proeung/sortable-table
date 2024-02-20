import React from 'react';

interface PaginationNavigationProps {
  children: React.ReactNode;
}

const PaginationNavigation: React.FC<PaginationNavigationProps> = ({ children }) => {
  return (
    <div className='pagination-navigation flex gap-x-1.5'>
      {children}
    </div>
  );
};

export default PaginationNavigation;