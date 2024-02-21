import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: string;
}

const Button: React.FC<ButtonProps> = ({ children, ariaLabel, onClick, disabled = false, variant = 'btn-text' }) => {
  return (
    <button
      type='button'
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={`${variant}`}
    >
      {children}
    </button>
  );
};

export default Button;
