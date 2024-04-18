import React from 'react';
import { ReactComponent as MagnifyingGlass } from 'assets/MagnifyingGlass.svg';

interface EmptyStateProps {
  heading?: string;
  description: string;
  actions?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  heading,
  description,
  actions
}) => {
  return (
    <div className='w-full py-16 md:py-40'>
      <div className='max-w-xl mx-auto flex flex-col items-center gap-y-6 text-center'>
        <MagnifyingGlass className='w-14 stroke-blue-600' />
        <div>
          {heading &&
            <h3 className='font-bold text-zinc-1000 text-2xl'>
              {heading}
            </h3>
          }
          <p className='text-zinc-900'>
            {description}
          </p>
        </div>
        {actions &&
          <div className="actions">
            {actions}
          </div>
        }
      </div>
    </div>
  );
};

export default EmptyState;
