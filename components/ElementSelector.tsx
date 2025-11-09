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
      <h2 className="text-lg font-semibold text-gray-300 mb-3">Add Elements</h2>
      <div className="flex flex-wrap gap-3">
        {visibleElements.map((element) => {
          const isSelected = selectedElements.includes(element.id);
          return (
            <button
              key={element.id}
              onClick={() => onElementToggle(element.id)}
              disabled={disabled}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                isSelected
                  ? 'bg-indigo-500 text-white ring-indigo-400'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ring-indigo-400 flex items-center gap-1 ${disabled ? 'cursor-not-allowed' : ''}`}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
    </div>
  );
};