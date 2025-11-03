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
      <h2 className="text-lg font-semibold text-gray-300 mb-3">Choose a Style</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style)}
            className={`p-3 rounded-lg text-center transition-all duration-200 transform hover:-translate-y-1 flex flex-col items-center justify-start gap-2 aspect-square focus:outline-none ${
              selectedStyle === style.id
                ? 'bg-gray-700 ring-2 ring-indigo-500 shadow-lg'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
            title={style.name}
          >
            <style.icon className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
            <p className="font-semibold text-xs leading-tight">{style.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};