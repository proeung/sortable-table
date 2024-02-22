import React from 'react';

interface EmptyStateProps {
  illustration?: React.ReactNode;
  heading?: string;
  description: string;
  actions?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  illustration,
  heading,
  description,
  actions
}) => {
  return (
    <div className='w-full py-16 md:py-40'>
      <div className='max-w-xl mx-auto flex flex-col items-center gap-y-6 text-center'>
        {illustration &&
          <div className="illustration">
            {illustration}
          </div>
        }
        <div>
          {heading &&
            <h3 className='font-bold text-salt-1000 text-2xl'>
              {heading}
            </h3>
          }
          <p className='text-salt-900'>
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
