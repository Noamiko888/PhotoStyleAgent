import React, { useState, useCallback, useEffect } from 'react';
import { StyleSelector } from './StyleSelector';
import { ElementSelector } from './ElementSelector';
import { ResultDisplay } from './ResultDisplay';
import { SparklesIcon } from './icons/SparklesIcon';
import { generateImage } from '../services/geminiService';
import { STYLE_PRESETS, PROMPT_ELEMENTS } from '../constants';
import { StylePreset } from '../types';

interface PhotoStyleEditorProps {
  onBack: () => void;
  uploadedFiles: File[];
  previewUrls: string[];
}

export const PhotoStyleEditor: React.FC<PhotoStyleEditorProps> = ({ onBack, uploadedFiles, previewUrls }) => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStyleSelect = useCallback((style: StylePreset) => {
    if (selectedStyle === style.id) return;

    setSelectedStyle(style.id);
    setSelectedElements([]); 
  }, [selectedStyle]);


  const handleElementToggle = useCallback((elementId: string) => {
    setSelectedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  }, []);

  useEffect(() => {
    if (!selectedStyle) {
      setPrompt('');
      return;
    }

    const baseStyle = STYLE_PRESETS.find(s => s.id === selectedStyle);
    if (!baseStyle) return;

    const basePrompt = baseStyle.promptTemplate;

    const elementFragments = PROMPT_ELEMENTS
      .filter(el => selectedElements.includes(el.id))
      .map(el => el.promptFragment)
      .join(' ');

    setPrompt([basePrompt, elementFragments].filter(Boolean).join(' '));
  }, [selectedStyle, selectedElements]);


  const handleGenerateClick = async () => {
    if (uploadedFiles.length === 0) {
      setError('Please upload at least one image using the top bar.');
      return;
    }
    if (!prompt) {
      setError('Please select a style or write a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const resultImageUrl = await generateImage(prompt, uploadedFiles);
      setGeneratedImageUrl(resultImageUrl);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Generation failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUpGenerate = async (followUpPrompt: string) => {
    if (!generatedImageUrl) {
      setError('Cannot perform follow-up without a generated image.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const resultImageUrl = await generateImage(followUpPrompt, generatedImageUrl);
      setGeneratedImageUrl(resultImageUrl);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Refinement failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };


  const isGenerateDisabled = isLoading || uploadedFiles.length === 0 || !prompt;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          &larr; Back to Tools
        </button>
        <h2 className="text-xl font-bold text-white tracking-wide">Photo Stylist</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Controls */}
        <div className="flex flex-col gap-8">
          
          <StyleSelector 
            styles={STYLE_PRESETS} 
            selectedStyle={selectedStyle} 
            onStyleSelect={handleStyleSelect} 
          />
          <ElementSelector 
            elements={PROMPT_ELEMENTS}
            selectedElements={selectedElements}
            onElementToggle={handleElementToggle}
          />
          <div className="bg-[#0F1623] p-5 rounded-xl border border-gray-800">
            <label htmlFor="prompt" className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
              Prompt Preview
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-150 outline-none resize-none text-sm leading-relaxed"
              placeholder="Select a style to generate a prompt..."
            />
          </div>
          <button
            onClick={handleGenerateClick}
            disabled={isGenerateDisabled}
            className={`w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl shadow-lg text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-gray-900 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:hover:scale-100`}
          >
            <SparklesIcon className="w-5 h-5 mr-2" />
            {isLoading ? 'Processing...' : 'Generate Styles'}
          </button>
          
        </div>

        {/* Right Column: Results */}
        <div className="flex flex-col">
           {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
              <span className="font-bold mr-1">Error:</span> {error}
            </div>
          )}
          <ResultDisplay
            generatedImageUrl={generatedImageUrl}
            previewUrls={previewUrls}
            isLoading={isLoading}
            onFollowUp={handleFollowUpGenerate}
          />
        </div>
      </div>
    </div>
  );
};