import React from 'react';

interface SortableTableContainerProps {
  ariaLabel: string;
  children: React.ReactNode;
  inlineStyles?: React.CSSProperties;
  title?: string;
  tabIndex?: number;
}

const SortableTableContainer: React.FC<SortableTableContainerProps> = ({ children, ariaLabel, inlineStyles, title, tabIndex }) => {
  return (
    <section
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      className='table-container relative overflow-x-auto'
      style={inlineStyles}>
      {title && (
        <h2>{title}</h2>
      )}
      {children}
    </section>
  );
};

export default SortableTableContainer;
