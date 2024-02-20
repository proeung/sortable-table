import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container px-5 md:px-10 xl:px-14 relative w-full">
      {children}
    </div>
  );
};

export default Container;
