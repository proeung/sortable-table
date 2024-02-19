import React from 'react';

interface PaginationNavigationButtonProps {
  variant: 'first' | 'previous' | 'next' | 'last';
  onClick: () => void; // Assuming you want to handle button clicks
  disabled?: boolean;
}

const PaginationNavigationButton: React.FC<PaginationNavigationButtonProps> = ({ variant, onClick, disabled = false }) => {
  const getButtonLabel = (variant: string) => {
    switch (variant) {
      case 'first': return 'First Page';
      case 'previous': return 'Previous Page';
      case 'next': return 'Next Page';
      case 'last': return 'Last Page';
      default: return '';
    }
  };

  return (
    <button onClick={onClick} disabled={disabled} aria-label={getButtonLabel(variant)}>
      {getButtonLabel(variant)}
    </button>
  );
};

export default PaginationNavigationButton;
