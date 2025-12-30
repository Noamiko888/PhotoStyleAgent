import React, { useState } from 'react';
import { ResultDisplay } from './ResultDisplay';
import { SparklesIcon } from './icons/SparklesIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { generateImage, refinePrompt } from '../services/geminiService';
import { AspectRatio } from '../types';

interface SocialMediaGeneratorProps {
  onBack: () => void;
  uploadedFiles: File[];
  previewUrls: string[];
}

const PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', ratio: '16:9' as AspectRatio },
  { id: 'instagram-post', name: 'Instagram Post', ratio: '1:1' as AspectRatio },
  { id: 'instagram-story', name: 'Instagram Story', ratio: '9:16' as AspectRatio },
  { id: 'facebook', name: 'Facebook', ratio: '16:9' as AspectRatio },
  { id: 'tiktok', name: 'TikTok', ratio: '9:16' as AspectRatio },
  { id: 'blog', name: 'Blog Header', ratio: '16:9' as AspectRatio },
];

const MOODS = [
  { id: 'professional', label: 'Professional', emoji: '👔' },
  { id: 'casual', label: 'Casual & Friendly', emoji: '👋' },
  { id: 'humorous', label: 'Funny / Meme', emoji: '😂' },
  { id: 'cartoon', label: 'Cartoon / Illustration', emoji: '🎨' },
  { id: 'abstract', label: 'Abstract Art', emoji: '🌀' },
  { id: 'minimalist', label: 'Minimalist', emoji: '⚪' },
  { id: 'inspirational', label: 'Inspirational', emoji: '✨' },
  { id: 'futuristic', label: 'Futuristic / Tech', emoji: '🤖' },
  { id: 'dramatic', label: 'Dramatic / Cinematic', emoji: '🎬' },
];

export const SocialMediaGenerator: React.FC<SocialMediaGeneratorProps> = ({ onBack, uploadedFiles, previewUrls }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(PLATFORMS[0]);
  const [selectedMood, setSelectedMood] = useState(MOODS[0].id);
  const [refinedPrompt, setRefinedPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [step, setStep] = useState<'input' | 'review' | 'result'>('input');
  const [error, setError] = useState<string | null>(null);

  const handleRefinePrompt = async () => {
    if (!postContent.trim()) {
      setError('Please enter your post content or a topic.');
      return;
    }
    
    setIsRefining(true);
    setError(null);
    try {
      const moodLabel = MOODS.find(m => m.id === selectedMood)?.label || selectedMood;
      const hasImages = uploadedFiles.length > 0;
      const suggestedPrompt = await refinePrompt(postContent, selectedPlatform.name, moodLabel, hasImages);
      setRefinedPrompt(suggestedPrompt);
      setStep('review');
    } catch (e) {
      setError('Failed to generate prompt idea. Please try again.');
      console.error(e);
    } finally {
      setIsRefining(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!refinedPrompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const imageSource = uploadedFiles.length > 0 ? uploadedFiles : null;
      const imageUrl = await generateImage(refinedPrompt, imageSource, selectedPlatform.ratio);
      setGeneratedImageUrl(imageUrl);
      setStep('result');
    } catch (e) {
      setError('Failed to generate image. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUp = async (followUpPrompt: string) => {
    if (!generatedImageUrl) return;
    
    setIsLoading(true);
    try {
      const imageUrl = await generateImage(followUpPrompt, generatedImageUrl, selectedPlatform.ratio);
      setGeneratedImageUrl(imageUrl);
    } catch (e) {
      setError('Failed to refine image.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
       <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          &larr; Back to Tools
        </button>
        <h2 className="text-xl font-bold text-white tracking-wide">Social Media Creator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Inputs */}
        <div className="flex flex-col gap-6">
          
          {/* Step 1: Input */}
          <div className={`p-6 bg-[#0F1623] rounded-xl border ${step === 'input' ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'border-gray-800'}`}>
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-bold text-white">1. Content & Strategy</h3>
               {step !== 'input' && <button onClick={() => setStep('input')} className="text-xs font-bold text-amber-500 hover:text-amber-400 uppercase tracking-wide">Edit</button>}
            </div>
            
            <div className="space-y-6">
               {uploadedFiles.length > 0 && (
                   <div className="text-xs font-medium text-emerald-400 bg-emerald-900/20 p-2.5 rounded-lg border border-emerald-900/50 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                     Using {uploadedFiles.length} uploaded photo{uploadedFiles.length > 1 ? 's' : ''} as reference.
                   </div>
               )}

               <div>
                <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Target Platform</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPlatform(p);
                      }}
                      className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${selectedPlatform.id === p.id ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
               </div>

               <div>
                 <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Visual Mood</label>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {MOODS.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMood(m.id)}
                        className={`p-2.5 text-xs font-medium rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 ${
                          selectedMood === m.id 
                          ? 'bg-amber-500/20 border-amber-500 text-white shadow-sm' 
                          : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                        }`}
                      >
                        <span className="text-base">{m.emoji}</span>
                        <span>{m.label}</span>
                      </button>
                    ))}
                 </div>
               </div>

               <div>
                <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  Post Topic
                </label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="What is your post about? e.g., 'New product launch', 'Motivational quote', 'Office behind-the-scenes'..."
                  rows={4}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none placeholder-gray-600 text-sm"
                  disabled={step !== 'input' && step !== 'review'}
                />
               </div>

               {step === 'input' && (
                  <button
                    onClick={handleRefinePrompt}
                    disabled={isRefining || !postContent.trim()}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  >
                    {isRefining ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Creating Concept...
                      </>
                    ) : (
                      <>
                        <LightbulbIcon className="w-5 h-5" />
                        Generate Prompt Idea
                      </>
                    )}
                  </button>
               )}
            </div>
          </div>

          {/* Step 2: Review */}
          {(step === 'review' || step === 'result') && (
            <div className={`p-6 bg-[#0F1623] rounded-xl border ${step === 'review' ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'border-gray-800'} animate-fade-in`}>
              <h3 className="text-lg font-bold text-white mb-4">2. Review & Generate</h3>
              
              <div className="space-y-4">
                <p className="text-xs text-gray-400 font-medium">
                  We've drafted a prompt for you. Tweaking it is optional.
                </p>
                <textarea
                  value={refinedPrompt}
                  onChange={(e) => setRefinedPrompt(e.target.value)}
                  rows={6}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none text-sm"
                />
                
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                   <span>Ratio: {selectedPlatform.ratio}</span>
                   <span className="ml-auto text-amber-500">{selectedPlatform.name}</span>
                </div>

                <button
                  onClick={handleGenerateImage}
                  disabled={isLoading}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:hover:scale-100"
                >
                  <SparklesIcon className="w-5 h-5" />
                  {isLoading ? 'Creating Visual...' : 'Generate Image'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Result */}
        <div className="flex flex-col">
           {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm font-medium animate-pulse">
                {error}
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