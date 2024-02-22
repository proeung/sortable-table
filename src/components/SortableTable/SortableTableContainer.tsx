import React, { ReactNode, CSSProperties, useRef, useState, useEffect } from 'react';

interface SortableTableContainerProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tabIndex?: number;
}

const SortableTableContainer: React.FC<SortableTableContainerProps> = ({ ariaLabel, children, className = '', style = {}, tabIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  const checkScrollable = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      return scrollWidth > clientWidth;
    }
    return false;
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftShadow(checkScrollable() && scrollLeft > 0);
      setShowRightShadow(checkScrollable() && scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    handleScroll();
    const handleResize = () => {
      handleScroll();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      className={`relative overflow-x-hidden ${className}`}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{ ...style }}
        className='overflow-x-auto'>
        {showLeftShadow &&
          <div
            className='shadow-left absolute top-0 w-5 h-full z-2 left-0 bg-[linear-gradient(to_right,_rgba(0,_0,_0,_0.18),_transparent)]' aria-hidden='true'>
          </div>
        }
        {children}
        {showRightShadow &&
          <div
            className='shadow-right absolute top-0 w-5 h-full z-2 right-0 bg-[linear-gradient(to_left,_rgba(0,_0,_0,_0.18),_transparent)]' aria-hidden='true'>
          </div>}
      </div>
    </section>
  );
};

export default SortableTableContainer;
