import React from 'react';

export const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      stroke="#4B5563"
      d="M20.25 14.15v4.075c0 1.313-.964 2.505-2.287 2.686-1.323.18-2.623-.173-3.486-.928-.863-.755-1.328-1.83-1.328-2.928V14.15" 
    />
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#9CA3AF"
      d="M17.25 14.15v-4.075a2.25 2.25 0 00-2.25-2.25h-5.25a2.25 2.25 0 00-2.25 2.25v4.075M10.5 14.15v-4.075a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v4.075M17.25 14.15v4.075a2.25 2.25 0 01-2.25 2.25h-5.25a2.25 2.25 0 01-2.25-2.25v-4.075M10.5 14.15h6.75"
    />
  </svg>
);