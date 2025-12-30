import React, { useState } from 'react';
import { PromptElement } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface ElementSelectorProps {
  elements: PromptElement[];
  selectedElements: string[];
  onElementToggle: (elementId: string) => void;
  disabled?: boolean;
}

const INITIAL_VISIBLE_COUNT = 5;

export const ElementSelector: React.FC<ElementSelectorProps> = ({ elements, selectedElements, onElementToggle, disabled = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const visibleElements = isExpanded ? elements : elements.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <div className={disabled ? 'opacity-50' : ''}>
      <h2 className="text-lg font-bold text-gray-300 mb-4 uppercase tracking-wider text-xs">Enhance Details</h2>
      <div className="flex flex-wrap gap-2">
        {visibleElements.map((element) => {
          const isSelected = selectedElements.includes(element.id);
          return (
            <button
              key={element.id}
              onClick={() => onElementToggle(element.id)}
              disabled={disabled}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 border ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md ring-amber-500'
                  : 'bg-[#0F1623] text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
              } ${disabled ? 'cursor-not-allowed' : ''}`}
            >
              {element.label}
            </button>
          );
        })}
        {elements.length > INITIAL_VISIBLE_COUNT && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            disabled={disabled}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors duration-200 bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none border border-gray-700 flex items-center gap-1 ${disabled ? 'cursor-not-allowed' : ''}`}
          >
            {isExpanded ? 'Less' : 'More'}
            <ChevronDownIcon className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
    </div>
  );
};