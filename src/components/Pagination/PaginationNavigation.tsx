import React from 'react';

interface PaginationNavigationProps {
  children: React.ReactNode;
}

const PaginationNavigation: React.FC<PaginationNavigationProps> = ({ children }) => {
  return <div className='pagination-navigation'>{children}</div>;
};

export default PaginationNavigation;