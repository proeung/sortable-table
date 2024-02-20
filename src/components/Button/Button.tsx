import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, ariaLabel, onClick, disabled = false }) => {
  return (
    <button
      type='button'
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className='flex items-center text-left'
    >
      {children}
    </button>
  );
};

export default Button;
