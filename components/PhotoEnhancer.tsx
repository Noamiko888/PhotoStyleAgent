import React, { useState } from 'react';
import { ResultDisplay } from './ResultDisplay';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { generateImage } from '../services/geminiService';

interface PhotoEnhancerProps {
  onBack: () => void;
  uploadedFiles: File[];
  previewUrls: string[];
}

export const PhotoEnhancer: React.FC<PhotoEnhancerProps> = ({ onBack, uploadedFiles, previewUrls }) => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<'enhance' | 'tweak'>('enhance');
  const [tweakPrompt, setTweakPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (uploadedFiles.length === 0) {
      setError('Please upload an image using the top bar.');
      return;
    }
    if (mode === 'tweak' && !tweakPrompt.trim()) {
      setError('Please describe the tweaks you want to make.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      let prompt = "";
      if (mode === 'enhance') {
        prompt = "Restore and enhance this photograph to professional quality. Significantly improve sharpness, clarity, and resolution. Fix blurriness, reduce noise, and correct lighting balance while strictly maintaining the original subject, facial features, and composition. Output in 4k definition, photorealistic.";
      } else {
        prompt = `Edit this image based on the following instruction: "${tweakPrompt}". Maintain the original composition and subject identity unless specified otherwise. High quality, photorealistic result.`;
      }

      const result = await generateImage(prompt, uploadedFiles);
      setGeneratedImageUrl(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to process image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUp = async (followUpPrompt: string) => {
    if (!generatedImageUrl) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateImage(followUpPrompt, generatedImageUrl);
      setGeneratedImageUrl(result);
    } catch (e) {
      setError("Failed to refine image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          &larr; Back to Tools
        </button>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 tracking-wide">
          <MagicWandIcon className="w-6 h-6 text-amber-500" />
          Photo Enhancer
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Control Panel */}
        <div className="flex flex-col gap-6">
          
          <div className="bg-[#0F1623] rounded-xl p-6 border border-gray-800 animate-fade-in shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6">Enhancement Mode</h3>
              
              <div className="flex gap-4 mb-8 bg-gray-900/50 p-1.5 rounded-xl border border-gray-800">
                <button
                  onClick={() => setMode('enhance')}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
                    mode === 'enhance' 
                    ? 'bg-amber-500 text-white shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Auto Enhance
                </button>
                <button
                  onClick={() => setMode('tweak')}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
                    mode === 'tweak' 
                    ? 'bg-amber-500 text-white shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Custom Tweak
                </button>
              </div>

              {mode === 'enhance' ? (
                <div className="text-gray-400 text-sm mb-8 bg-gray-800/30 p-5 rounded-lg border border-gray-700/30">
                  <p className="mb-2 font-medium text-amber-500">How it works:</p>
                  <p className="leading-relaxed">AI will intelligently sharpen details, reduce noise, and upscale resolution while strictly preserving facial identity and original composition.</p>
                </div>
              ) : (
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                    Instructions
                  </label>
                  <textarea
                    value={tweakPrompt}
                    onChange={(e) => setTweakPrompt(e.target.value)}
                    placeholder="e.g. 'Remove the person in the background', 'Make the sky bluer'..."
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
                  />
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isLoading || (mode === 'tweak' && !tweakPrompt) || uploadedFiles.length === 0}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg transition-transform transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 disabled:bg-gray-800 disabled:text-gray-500"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <>
                    <MagicWandIcon className="w-5 h-5" />
                    {mode === 'enhance' ? 'Enhance Photo' : 'Apply Tweaks'}
                  </>
                )}
              </button>
            </div>
          
        </div>

        {/* Right Result Panel */}
        <div className="flex flex-col">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}
          <ResultDisplay 
            generatedImageUrl={generatedImageUrl}
            previewUrls={previewUrls}
            isLoading={isLoading}
            onFollowUp={handleFollowUp}
          />
        </div>
      </div>
    </div>
  );
};