import React from 'react';

interface SpinnerProps {
  title: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  title
}) => {
  return (
    <div className='max-w-xl mx-auto text-center w-full py-16 md:py-40' role='status'>
      <div
        className='animate-spin inline-block size-8 border-[4px] border-current border-t-transparent text-blue-500 rounded-full dark:text-blue-500'
        role='status'
        aria-label={title}>
        <span className='sr-only'>{title}</span>
      </div>
    </div>
  );
};

export default Spinner;
