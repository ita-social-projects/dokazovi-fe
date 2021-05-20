import React from 'react';

export const DoneIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10.5" cy="10.5" r="9.5" fill="black" />
      <path
        d="M15.2358 15.4111L5.62549 5.80078"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M5.62549 15.4111L15.2358 5.80078"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};
