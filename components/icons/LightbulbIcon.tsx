import React from 'react';

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      stroke="#9CA3AF"
      strokeWidth={1.5}
      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a12.06 12.06 0 00-4.5 0m4.5-4.622a12.06 12.06 0 01-4.5 0" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      stroke="#FBBF24"
      strokeWidth={1.5}
      d="M12 3c-5.392 0-9.878 4.332-9.878 9.683 0 5.351 4.486 9.683 9.878 9.683s9.878-4.332 9.878-9.683C21.878 7.332 17.392 3 12 3z"
    />
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#FBBF24"
      strokeWidth={1.5}
      d="M12 3.375a.375.375 0 100 .75.375.375 0 000-.75z"
      fill="#FBBF24"
    />
  </svg>
);