import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  heading?: string;
  description?: string;
}

const Section: React.FC<SectionProps> = ({ heading, description, children }) => {
  return (
    <section className='w-full'>
      <div className="container px-5 md:px-10 xl:px-14 relative">
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
      </div>
    </section>
  );
};

export default Section;
