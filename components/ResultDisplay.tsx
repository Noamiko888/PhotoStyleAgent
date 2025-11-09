import React, { useState, useEffect } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ResultDisplayProps {
  generatedImageUrl: string | null;
  previewUrl: string | null;
  isLoading: boolean;
  onFollowUp: (prompt: string) => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10 text-center p-4 rounded-lg">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-400"></div>
    <p className="text-white mt-4 font-semibold">Styling your image...</p>
    <p className="text-gray-400 text-sm mt-1">This can take up to 30 seconds.</p>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedImageUrl, previewUrl, isLoading, onFollowUp }) => {
  const [followUpPrompt, setFollowUpPrompt] = useState('');
  const [showOriginal, setShowOriginal] = useState(false);
  const hasContent = isLoading || generatedImageUrl;

  // Reset the toggle to show the new generated image whenever it changes.
  useEffect(() => {
    setShowOriginal(false);
  }, [generatedImageUrl]);

  const handleFollowUpClick = () => {
    if (followUpPrompt.trim() && !isLoading) {
      onFollowUp(followUpPrompt);
    }
  };

  if (!hasContent) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg p-8 min-h-[250px] lg:min-h-0">
        <p className="text-gray-500 text-center">Upload an image and select a style to see the generated result here.</p>
      </div>
    );
  }

  const currentImageUrl = showOriginal ? previewUrl : generatedImageUrl;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg flex items-center justify-center">
        {isLoading && <LoadingSpinner />}
        
        {!isLoading && generatedImageUrl && previewUrl && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-gray-900/60 backdrop-blur-sm p-1 rounded-full flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setShowOriginal(false)}
              className={`px-4 py-1 rounded-full transition-colors duration-200 ${!showOriginal ? 'bg-indigo-600 text-white shadow' : 'text-gray-300 hover:bg-gray-700/50'}`}
              aria-pressed={!showOriginal}
            >
              Generated
            </button>
            <button
              onClick={() => setShowOriginal(true)}
              className={`px-4 py-1 rounded-full transition-colors duration-200 ${showOriginal ? 'bg-indigo-600 text-white shadow' : 'text-gray-300 hover:bg-gray-700/50'}`}
              aria-pressed={showOriginal}
            >
              Original
            </button>
          </div>
        )}
        
        {currentImageUrl && (
          <img src={currentImageUrl} alt={showOriginal ? 'Original uploaded image' : 'AI generated image'} className="w-full h-full object-contain" />
        )}
        
        {!isLoading && generatedImageUrl && !showOriginal && (
           <a
              href={generatedImageUrl}
              download="styled-image.png"
              className="absolute bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 z-20"
              aria-label="Download generated image"
            >
              <DownloadIcon className="w-5 h-5" />
            </a>
        )}
      </div>

      {!isLoading && generatedImageUrl && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col gap-3 transition-all duration-300 animate-fade-in">
          <h3 className="text-md font-semibold text-gray-300">
            Make further edits
          </h3>
          <textarea
            value={followUpPrompt}
            onChange={(e) => setFollowUpPrompt(e.target.value)}
            rows={3}
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="e.g., 'Make the background darker' or 'Change the shirt to blue'"
          />
          <button
            onClick={handleFollowUpClick}
            disabled={!followUpPrompt.trim() || isLoading}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            <SparklesIcon className="w-4 h-4 mr-2" />
            Refine Image
          </button>
        </div>
      )}
    </div>
  );
};

// Add a simple fade-in animation for the follow-up section
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);