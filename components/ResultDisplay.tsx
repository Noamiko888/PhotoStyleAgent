
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  generatedImageUrl: string | null;
  isLoading: boolean;
}

const LoadingSpinner: React.FC = () => (
  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10 text-center p-4">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-400"></div>
    <p className="text-white mt-4 font-semibold">Styling your image...</p>
    <p className="text-gray-400 text-sm mt-1">This can take up to 30 seconds.</p>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedImageUrl, isLoading }) => {
  const hasContent = isLoading || generatedImageUrl;

  if (!hasContent) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg p-8 min-h-[250px] lg:min-h-0">
        <p className="text-gray-500 text-center">Upload an image and select a style to see the generated result here.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg flex items-center justify-center min-h-[250px] lg:min-h-0">
      {isLoading && <LoadingSpinner />}
      {generatedImageUrl && (
        <img src={generatedImageUrl} alt="Generated" className="w-full h-full object-contain" />
      )}
      {!isLoading && generatedImageUrl && (
         <a
            href={generatedImageUrl}
            download="styled-image.png"
            className="absolute bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            aria-label="Download generated image"
          >
            <DownloadIcon className="w-5 h-5" />
          </a>
      )}
    </div>
  );
};
