import React from 'react';

export const AnimeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M12 2L9.44 8.6L2 9.82L7.46 14.47L5.82 21.5L12 17.62L18.18 21.5L16.54 14.47L22 9.82L14.56 8.6L12 2Z"
      stroke="#F472B6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#FBCFE8"
    />
    <path
      d="M15 8.5L15.5 7L16 8.5L17 9L16 9.5L15.5 11L15 9.5L14 9L15 8.5Z"
      fill="#F0ABFC"
    />
     <path
      d="M8.5 13L8 12.5L7.5 13L7 14L7.5 15L8 15.5L8.5 15L9 14L8.5 13Z"
      fill="#ECFDF5"
    />
  </svg>
);