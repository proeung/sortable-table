import React from 'react';
import { ReactComponent as ErrorIcon } from 'assets/Error.svg';

interface CrashStateProps {
  heading: string;
  message?: string;
}

const CrashState: React.FC<CrashStateProps> = ({
  heading,
  message
}) => {
  return (
    <div className='w-full py-16 md:py-40'>
      <div className='max-w-xl mx-auto flex flex-col items-center gap-y-6 text-center'>
        <div className=''>
          <ErrorIcon className='w-14' />
        </div>
        <div>
          <h3 className='font-bold text-salt-1000 text-2xl'>
            {heading}
          </h3>
          {message &&
            <p className='text-salt-900'>
              {message}
            </p>
          }
        </div>
      </div>
    </div>
  );
};

export default CrashState;
