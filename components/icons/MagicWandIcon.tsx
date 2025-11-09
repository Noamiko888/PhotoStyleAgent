import React from 'react';

export const MagicWandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <linearGradient id="wandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#A78BFA', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      stroke="url(#wandGradient)" 
      strokeWidth="1.5" 
      d="M11.362 2.259a2.25 2.25 0 00-2.724 2.724l1.26 5.042a2.25 2.25 0 01-2.032 2.871l-6.286.786a2.25 2.25 0 00-1.928 2.332l.142 1.272a2.25 2.25 0 002.332 1.928l6.286-.786a2.25 2.25 0 012.871-2.032l5.042 1.26a2.25 2.25 0 002.724-2.724l-1.26-5.042a2.25 2.25 0 012.032-2.871l6.286-.786a2.25 2.25 0 001.928-2.332l-.142-1.272a2.25 2.25 0 00-2.332-1.928l-6.286.786a2.25 2.25 0 01-2.871 2.032L11.362 2.259z"
    ></path>
    <path fill="#FBCFE8" d="M19.5 2.25a.75.75 0 01.75.75c0 .414-.336.75-.75.75a.75.75 0 01-.75-.75c0-.414.336-.75.75-.75z"></path>
    <path fill="#DDD6FE" d="M5.25 19.5a.75.75 0 01.75.75c0 .414-.336.75-.75.75a.75.75 0 01-.75-.75c0-.414.336-.75.75-.75z"></path>
    <path fill="#C4B5FD" d="M21.75 9a.75.75 0 01.75.75c0 .414-.336.75-.75.75a.75.75 0 01-.75-.75c0-.414.336-.75.75-.75z"></path>
  </svg>
);