'use client';

import { useState, useEffect } from 'react';

interface TypewriterTitleProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypewriterTitle = ({ 
  text, 
  speed = 50, 
  className = ""
}: TypewriterTitleProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <h1 className={`${className} ${!isComplete ? "after:content-['|'] after:animate-blink after:ml-1" : ""}`}>
      {displayText}
    </h1>
  );
};

export default TypewriterTitle; 