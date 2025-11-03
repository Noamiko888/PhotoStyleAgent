import React from 'react';

export const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    {...props}
  >
    <defs>
      <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#84CC16', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#16A34A', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      stroke="url(#leafGradient)"
      strokeWidth={1.5}
      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a12.022 12.022 0 01-11.134 0m11.134 0a11.953 11.953 0 01-2.625-.42m2.625.42a11.953 11.953 0 01-2.625-.42m-8.509 0a11.953 11.953 0 012.625.42m-2.625-.42a11.953 11.953 0 012.625.42m7.35-4.32a6 6 0 01-5.84-7.38v4.82m5.84 2.56a12.022 12.022 0 01-11.134 0" 
    />
  </svg>
);