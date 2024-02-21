import React from 'react';

interface SortableTableContainerProps {
  ariaLabel: string;
  children: React.ReactNode;
  inlineStyles?: React.CSSProperties;
  heading?: string;
  description?: string;
  tabIndex?: number;
}

const SortableTableContainer: React.FC<SortableTableContainerProps> = ({ children, ariaLabel, inlineStyles, heading, description, tabIndex }) => {
  return (
    <section
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      className='table-container relative overflow-x-auto'
      style={inlineStyles}>
      {heading && (
        <h2 className='font-bold text-salt-1000 text-3xl mb-2'>
          {heading}
        </h2>
      )}
      {description &&
        <p className='text-left mb-8 text-salt-900'>
          {description}
        </p>
      }
      {children}
    </section>
  );
};

export default SortableTableContainer;
