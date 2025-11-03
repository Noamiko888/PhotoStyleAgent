import React from 'react';
import { PromptElement } from '../types';

interface ElementSelectorProps {
  elements: PromptElement[];
  selectedElements: string[];
  onElementToggle: (elementId: string) => void;
}

export const ElementSelector: React.FC<ElementSelectorProps> = ({ elements, selectedElements, onElementToggle }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-300 mb-3">Add Elements</h2>
      <div className="flex flex-wrap gap-3">
        {elements.map((element) => {
          const isSelected = selectedElements.includes(element.id);
          return (
            <button
              key={element.id}
              onClick={() => onElementToggle(element.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                isSelected
                  ? 'bg-indigo-500 text-white ring-indigo-400'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {element.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
