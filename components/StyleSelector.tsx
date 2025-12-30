import React from 'react';
import { StylePreset } from '../types';

interface StyleSelectorProps {
  styles: StylePreset[];
  selectedStyle: string | null;
  onStyleSelect: (style: StylePreset) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleSelect }) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-300 mb-4 uppercase tracking-wider text-xs">Choose a Style</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style)}
            className={`p-3 rounded-xl text-center transition-all duration-200 transform hover:-translate-y-1 flex flex-col items-center justify-start gap-2 aspect-square focus:outline-none ${
              selectedStyle === style.id
                ? 'bg-[#0F1623] ring-2 ring-amber-500 shadow-xl scale-105'
                : 'bg-[#0F1623] hover:bg-gray-800 text-gray-400 border border-gray-800'
            }`}
            title={style.name}
          >
            <style.icon className={`w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 transition-colors ${selectedStyle === style.id ? 'text-amber-500' : 'text-gray-500'}`} />
            <p className={`font-bold text-[10px] leading-tight uppercase ${selectedStyle === style.id ? 'text-white' : 'text-gray-500'}`}>{style.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};