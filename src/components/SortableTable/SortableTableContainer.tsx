import React from 'react';

interface SortableTableContainerProps {
  ariaLabel: string;
  children: React.ReactNode;
  description?: string;
  inlineStyles?: React.CSSProperties;
  title?: string;
  tabIndex?: number;
}

const SortableTableContainer: React.FC<SortableTableContainerProps> = ({ children, ariaLabel, description, inlineStyles, title, tabIndex }) => {
  return (
    <section tabIndex={tabIndex} aria-label={ariaLabel} className='table-container' style={inlineStyles}>
      {title && (
        <h2 className='table-container__heading'>{title}</h2>
      )}

      {description && (
        <p className='table-container__desc'>
          {description}
        </p>
      )}

      <div className='table-container__content'>
        {children}
      </div>
    </section>
  );
};

export default SortableTableContainer;
