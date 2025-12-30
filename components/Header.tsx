import React from 'react';
import { CritiqeLogo } from './icons/CritiqeLogo';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#0B1121]/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center sm:justify-between">
        <div className="flex items-center gap-3">
          <CritiqeLogo className="w-10 h-10 shadow-lg" />
          <div className="text-left">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              CRITIQE
            </h1>
            <p className="text-[10px] text-amber-500 font-semibold tracking-widest uppercase">
              Studio
            </p>
          </div>
        </div>
        
        <div className="hidden sm:block text-right">
             <p className="text-gray-400 text-xs">AI-Powered Solutions</p>
        </div>
      </div>
    </header>
  );
};