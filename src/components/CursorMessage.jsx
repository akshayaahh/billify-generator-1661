import React, { useState, useEffect } from 'react';

const CursorMessage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [fadeTimeout, setFadeTimeout] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Clear previous timeout
      if (fadeTimeout) {
        clearTimeout(fadeTimeout);
      }

      // Set new timeout to fade out after 2 seconds
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      setFadeTimeout(timeout);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (fadeTimeout) {
        clearTimeout(fadeTimeout);
      }
    };
  }, [fadeTimeout]);

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-all duration-500 ease-out ${
        isVisible ? 'opacity-70' : 'opacity-0'
      }`}
      style={{
        left: position.x + 20,
        top: position.y - 10,
        transform: 'translate(0, -100%)',
      }}
    >
      <div className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-light tracking-wide">
        Designed by Akshaya
      </div>
    </div>
  );
};

export default CursorMessage;