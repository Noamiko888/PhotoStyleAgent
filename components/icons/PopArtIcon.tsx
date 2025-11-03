import React from 'react';

export const PopArtIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <rect
      x="8"
      y="2"
      width="14"
      height="14"
      rx="2"
      stroke="#E879F9"
      fill="#F0ABFC"
      fillOpacity="0.8"
      strokeWidth="1.5"
    />
    <rect
      x="5"
      y="5"
      width="14"
      height="14"
      rx="2"
      stroke="#22D3EE"
      fill="#67E8F9"
      fillOpacity="0.8"
      strokeWidth="1.5"
    />
    <rect
      x="2"
      y="8"
      width="14"
      height="14"
      rx="2"
      stroke="#FACC15"
      fill="#FDE047"
      fillOpacity="0.8"
      strokeWidth="1.5"
    />
  </svg>
);