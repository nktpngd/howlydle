'use client';

import Link from 'next/link';
import { useState } from 'react';

export const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/">
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1
          className={`
          text-4xl md:text-6xl 
          bg-clip-text text-transparent 
          bg-gradient-to-b 
          ${
            isHovered
              ? 'from-blue-300 to-blue-600 scale-105 transform'
              : 'from-neutral-200 to-neutral-600'
          }
          text-center font-sans font-bold
          transition-all duration-300 ease-in-out
        `}
        >
          Howlydle
        </h1>

        {/* Glow effect on hover */}
        <div
          className={`
          absolute inset-0 
          bg-gradient-to-r from-blue-500 to-cyan-500 
          blur-xl opacity-0
          ${isHovered ? 'opacity-20' : ''}
          transition-opacity duration-300
          pointer-events-none
          -z-10
        `}
        ></div>
      </div>
    </Link>
  );
};
