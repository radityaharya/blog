"use client"
import { useEffect, useState } from 'react';

const ScrollIndicator = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    setScrollTop(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div className="w-full h-1 fixed top-0 left-0 z-50">
      <div style={{ width: `${scrollTop}%` }} className="h-full bg-black dark:bg-white"/>
    </div>
  );
};

export default ScrollIndicator;