
import React from 'react';

export const CpuChipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 16.5v-1.5m3.75-15H21m-18 0h1.5m15 15H21m-18 0h1.5M12 21v-1.5m0-16.5V3" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M5.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM12 21.75a2.625 2.625 0 110-5.25 2.625 2.625 0 010 5.25z" 
    />
  </svg>
);
