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
    <section tabIndex={tabIndex} aria-label={ariaLabel} className='table-container' style={inlineStyles}>
      {title && (
        <h2 className='table-container__heading'>{title}</h2>
      )}

      <div className='table-container__content'>
        {children}
      </div>
    </section>
  );
};

export default SortableTableContainer;
