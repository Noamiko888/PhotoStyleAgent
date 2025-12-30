import React, { useState, useEffect } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ResultDisplayProps {
  generatedImageUrl: string | null;
  previewUrls: string[];
  isLoading: boolean;
  onFollowUp: (prompt: string) => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="absolute inset-0 bg-[#0B1121] bg-opacity-80 flex flex-col items-center justify-center z-10 text-center p-4 rounded-lg backdrop-blur-sm">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500"></div>
    <p className="text-white mt-4 font-semibold">Creating Magic...</p>
    <p className="text-gray-400 text-sm mt-1">This usually takes about 10-20 seconds.</p>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedImageUrl, previewUrls, isLoading, onFollowUp }) => {
  const [followUpPrompt, setFollowUpPrompt] = useState('');
  const [showOriginal, setShowOriginal] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
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

  const handleDownload = async () => {
    if (!generatedImageUrl) return;
    setIsSharing(true);

    try {
      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const file = new File([blob], "critiqe-studio-image.png", { type: blob.type });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Critiqe Studio Image',
          text: 'Created with Critiqe Studio',
        });
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "critiqe-studio-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
      }
    } catch (error) {
      // Ignore AbortError (user cancelled share)
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error("Download/Share failed:", error);
      
      // Fallback
      const link = document.createElement('a');
      link.href = generatedImageUrl;
      link.download = "critiqe-studio-image.png";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsSharing(false);
    }
  };

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;

    if (showOriginal && previewUrls.length > 0) {
        if (previewUrls.length === 1) {
            return <img src={previewUrls[0]} alt="Original uploaded image" className="w-full h-full object-contain" />;
        }
        return (
            <div className="w-full h-full bg-gray-900 grid grid-cols-2 gap-1 overflow-y-auto">
                {previewUrls.map((url, idx) => (
                    <div key={idx} className="relative aspect-square">
                        <img src={url} alt={`Original ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        );
    }

    if (generatedImageUrl) {
        return <img src={generatedImageUrl} alt="AI generated image" className="w-full h-full object-contain" />;
    }

    return null;
  };

  if (!hasContent) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800/30 border-2 border-dashed border-gray-700 rounded-lg p-8 min-h-[250px] lg:min-h-0">
        <p className="text-gray-500 text-center">Your generated masterpiece will appear here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square bg-[#0F1623] rounded-xl overflow-hidden border border-gray-800 shadow-2xl flex items-center justify-center">
        
        {!isLoading && generatedImageUrl && previewUrls.length > 0 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-md p-1 rounded-full flex items-center gap-1 text-sm font-medium border border-white/10">
            <button
              onClick={() => setShowOriginal(false)}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${!showOriginal ? 'bg-amber-500 text-white shadow-lg font-bold' : 'text-gray-300 hover:bg-white/10'}`}
              aria-pressed={!showOriginal}
            >
              Result
            </button>
            <button
              onClick={() => setShowOriginal(true)}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${showOriginal ? 'bg-amber-500 text-white shadow-lg font-bold' : 'text-gray-300 hover:bg-white/10'}`}
              aria-pressed={showOriginal}
            >
              Originals
            </button>
          </div>
        )}
        
        {renderContent()}
        
        {!isLoading && generatedImageUrl && !showOriginal && (
           <button
              onClick={handleDownload}
              disabled={isSharing}
              className="absolute bottom-4 right-4 bg-amber-500 text-white p-3.5 rounded-full shadow-lg hover:bg-amber-600 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 z-20 disabled:opacity-75 disabled:cursor-wait"
              aria-label="Download"
              title="Save Image"
            >
              <DownloadIcon className="w-6 h-6" />
            </button>
        )}
      </div>

      {!isLoading && generatedImageUrl && (
        <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 animate-fade-in backdrop-blur-sm">
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
            Refine Result
          </h3>
          <textarea
            value={followUpPrompt}
            onChange={(e) => setFollowUpPrompt(e.target.value)}
            rows={2}
            className="w-full bg-[#0B1121] border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition outline-none placeholder-gray-600 text-sm"
            placeholder="Tell us what to fix (e.g., 'Make it brighter', 'Fix the eyes')"
          />
          <button
            onClick={handleFollowUpClick}
            disabled={!followUpPrompt.trim() || isLoading}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-bold rounded-lg text-white bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            <SparklesIcon className="w-4 h-4 mr-2" />
            Apply Changes
          </button>
        </div>
      )}
    </div>
  );
};

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