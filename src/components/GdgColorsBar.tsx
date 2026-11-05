import React from 'react';

export const GdgColorsBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full h-1.5 grid grid-cols-4 ${className}`}>
      <div className="bg-[#4285F4]" />
      <div className="bg-[#EA4335]" />
      <div className="bg-[#FBBC04]" />
      <div className="bg-[#188038]" />
    </div>
  );
};

