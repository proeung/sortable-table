import React from 'react';
import Button from 'components/Button/Button';
import { ReactComponent as FirstPageIcon } from '../../assets/FirstPage.svg';
import { ReactComponent as PreviousPageIcon } from '../../assets/ChevronLeft.svg';
import { ReactComponent as NextPageIcon } from '../../assets/ChevronRight.svg';
import { ReactComponent as LastPageIcon } from '../../assets/LastPage.svg';

interface PaginationNavigationButtonProps {
  variant: 'first' | 'previous' | 'next' | 'last';
  onClick: () => void;
  disabled?: boolean;
}

const PaginationNavigationButton: React.FC<PaginationNavigationButtonProps> = ({ variant, onClick, disabled = false }) => {
  const Icon = {
    first: FirstPageIcon,
    previous: PreviousPageIcon,
    next: NextPageIcon,
    last: LastPageIcon,
  }[variant];

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
    <Button
      onClick={onClick}
      disabled={disabled}
      ariaLabel={'Navigate to ' + getButtonLabel(variant)}
      variant={`btn-icon ${variant}`}
    >
      <Icon />
    </Button>
  );
};

export default PaginationNavigationButton;
