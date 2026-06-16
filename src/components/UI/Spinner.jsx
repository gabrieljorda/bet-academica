import React from 'react';

const Spinner = ({ size = 'md', color = 'primary' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const colors = {
    primary: 'border-primary',
    white: 'border-white',
    gray: 'border-gray-500'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${sizes[size]} ${colors[color]}`}
      />
    </div>
  );
};

export default Spinner;