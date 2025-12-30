import React from 'react';

export const CritiqeLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#1E293B" />
    <path 
      d="M25 25 C 25 25, 75 25, 75 50 C 75 75, 75 75, 50 75 C 25 75, 25 75, 25 25" 
      stroke="white" 
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="50" r="12" stroke="white" strokeWidth="8" />
    <circle cx="50" cy="50" r="4" fill="white" />
  </svg>
);