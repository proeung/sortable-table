import React from 'react';

interface SortableTableContainerProps {
  ariaLabel: string;
  children: React.ReactNode;
  description?: string;
  title?: string;
}

const SortableTableContainer: React.FC<SortableTableContainerProps> = ({ children, ariaLabel, description, title }) => {
  return (
    <section aria-label={ariaLabel} className='table-container'>
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
