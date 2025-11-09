import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { ElementSelector } from './components/ElementSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { Footer } from './components/Footer';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { generateImage } from './services/geminiService';
import { STYLE_PRESETS, PROMPT_ELEMENTS, SUPPORTED_FORMATS, MAX_FILE_SIZE_MB } from './constants';
import { StylePreset } from './types';

const App: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setError(null);
    setGeneratedImageUrl(null);

    // Validation
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      setError(`Unsupported file format. Please use JPEG, PNG, WEBP, HEIC, or HEIF.`);
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }
    
    let fileForProcessing = file;

    if (file.type === 'image/heic' || file.type === 'image/heif') {
      setIsConverting(true);
      try {
        const heic2any = (await import('heic2any')).default;
        const conversionResult = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.9,
        });

        const convertedBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
        
        fileForProcessing = new File([convertedBlob], file.name.replace(/\.(heic|heif)$/i, '.jpeg'), {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });

      } catch (e) {
        console.error("HEIC conversion error:", e);
        setError("Could not convert HEIC file. Please try a different format.");
        setIsConverting(false);
        return;
      } finally {
        setIsConverting(false);
      }
    }
    
    setUploadedFile(fileForProcessing);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(fileForProcessing));
  }, [previewUrl]);

  const handleStyleSelect = useCallback((style: StylePreset) => {
    if (selectedStyle === style.id) return;

    setSelectedStyle(style.id);
    setSelectedElements([]); // Reset elements on new style selection
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
    if (!uploadedFile) {
      setError('Please upload an image first.');
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
      const resultImageUrl = await generateImage(prompt, uploadedFile);
      setGeneratedImageUrl(resultImageUrl);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate image: ${errorMessage}`);
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
      setError(`Failed to refine image: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };


  const isGenerateDisabled = isLoading || !uploadedFile || !prompt;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Controls */}
          <div className="flex flex-col gap-6">
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              previewUrl={previewUrl}
              isConverting={isConverting}
            />
            {previewUrl && (
              <>
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
                <div>
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Prompt (auto-generated, you can edit it)
                  </label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    placeholder="e.g., 'Change the background to a futuristic cityscape at night.'"
                  />
                </div>
                <button
                  onClick={handleGenerateClick}
                  disabled={isGenerateDisabled}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100`}
                >
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  {isLoading ? 'Generating...' : 'Generate Image'}
                </button>
              </>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="flex flex-col">
             {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <ResultDisplay
              generatedImageUrl={generatedImageUrl}
              previewUrl={previewUrl}
              isLoading={isLoading}
              onFollowUp={handleFollowUpGenerate}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;