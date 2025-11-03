
import React from 'react';

export const CubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M21 7.5v5.529a3.375 3.375 0 01-1.13 2.454l-5.656 5.656a3.375 3.375 0 01-2.454 1.13H7.875a3.375 3.375 0 01-2.454-1.13l-5.656-5.656A3.375 3.375 0 01.625 13.03V7.5m18-3.375a3.375 3.375 0 00-3.375-3.375h-9.75a3.375 3.375 0 00-3.375 3.375m16.5 0v5.529a3.375 3.375 0 01-1.13 2.454l-5.656 5.656a3.375 3.375 0 01-2.454 1.13H7.875a3.375 3.375 0 01-2.454-1.13L.625 13.029A3.375 3.375 0 01-.5 10.57V7.5m18 0v-2.625a3.375 3.375 0 00-3.375-3.375h-9.75a3.375 3.375 0 00-3.375 3.375V7.5" 
    />
  </svg>
);
