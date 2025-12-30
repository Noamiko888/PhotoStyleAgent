import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PhotoStyleEditor } from './components/PhotoStyleEditor';
import { SocialMediaGenerator } from './components/SocialMediaGenerator';
import { PhotoEnhancer } from './components/PhotoEnhancer';
import { ImageUploader } from './components/ImageUploader';
import { ImageIcon } from './components/icons/ImageIcon';
import { GlobeIcon } from './components/icons/GlobeIcon';
import { MagicWandIcon } from './components/icons/MagicWandIcon';
import { SUPPORTED_FORMATS, MAX_FILE_SIZE_MB } from './constants';

type ToolMode = 'home' | 'photo-editor' | 'social-media' | 'photo-enhancer';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolMode>('home');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleGlobalImageUpload = useCallback(async (files: File[]) => {
    setUploadError(null);
    
    const validFiles: File[] = [];
    
    for (const file of files) {
        if (!SUPPORTED_FORMATS.includes(file.type)) {
            setUploadError(`Unsupported format. Please use JPEG, PNG, WEBP, HEIC, or HEIF.`);
            return;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setUploadError(`File too large. Max ${MAX_FILE_SIZE_MB} MB.`);
            return;
        }
        validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setIsConverting(true);
    const processedFiles: File[] = [];

    try {
        const heic2any = (await import('heic2any')).default;
        
        for (const file of validFiles) {
            if (file.type === 'image/heic' || file.type === 'image/heif') {
                try {
                    const conversionResult = await heic2any({
                        blob: file,
                        toType: 'image/jpeg',
                        quality: 0.9,
                    });
                    const convertedBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
                    processedFiles.push(new File([convertedBlob], file.name.replace(/\.(heic|heif)$/i, '.jpeg'), {
                        type: 'image/jpeg',
                        lastModified: Date.now(),
                    }));
                } catch (e) {
                    console.error("HEIC conversion error", e);
                }
            } else {
                processedFiles.push(file);
            }
        }
    } catch (e) {
         console.error("Import error", e);
    } finally {
        setIsConverting(false);
    }

    previewUrls.forEach(url => URL.revokeObjectURL(url));

    setUploadedFiles(processedFiles);
    setPreviewUrls(processedFiles.map(f => URL.createObjectURL(f)));
  }, [previewUrls]);


  const renderTool = () => {
    switch (activeTool) {
      case 'photo-editor':
        return <PhotoStyleEditor onBack={() => setActiveTool('home')} uploadedFiles={uploadedFiles} previewUrls={previewUrls} />;
      case 'social-media':
        return <SocialMediaGenerator onBack={() => setActiveTool('home')} uploadedFiles={uploadedFiles} previewUrls={previewUrls} />;
      case 'photo-enhancer':
        return <PhotoEnhancer onBack={() => setActiveTool('home')} uploadedFiles={uploadedFiles} previewUrls={previewUrls} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
             <div className="text-center mb-12">
               <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                 Creative Solutions for <span className="text-amber-500">Big Ideas</span>
               </h2>
               <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                 Critiqe Studio helps you work smarter with AI. Enhance, style, and create visuals instantly.
               </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                
                {/* Tool Card 1 */}
                <button 
                  onClick={() => setActiveTool('photo-editor')}
                  className="group relative bg-[#0F1623] hover:bg-[#162032] border border-gray-800 hover:border-amber-500/50 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/10"
                >
                  <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <ImageIcon className="w-8 h-8 text-amber-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Photo Stylist</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Professional headshots, creative portraits, and artistic transformations.
                  </p>
                  <span className="mt-auto text-amber-500 font-bold text-sm tracking-wide opacity-80 group-hover:opacity-100 flex items-center gap-1">
                    START CREATING <span className="text-lg">&rarr;</span>
                  </span>
                </button>

                {/* Tool Card 2 */}
                <button 
                  onClick={() => setActiveTool('photo-enhancer')}
                  className="group relative bg-[#0F1623] hover:bg-[#162032] border border-gray-800 hover:border-amber-500/50 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/10"
                >
                  <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <MagicWandIcon className="w-8 h-8 text-amber-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Enhancer</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Fix blur, upscale resolution, and tweak details with precision.
                  </p>
                  <span className="mt-auto text-amber-500 font-bold text-sm tracking-wide opacity-80 group-hover:opacity-100 flex items-center gap-1">
                    ENHANCE NOW <span className="text-lg">&rarr;</span>
                  </span>
                </button>

                {/* Tool Card 3 */}
                <button 
                   onClick={() => setActiveTool('social-media')}
                   className="group relative bg-[#0F1623] hover:bg-[#162032] border border-gray-800 hover:border-amber-500/50 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/10"
                >
                  <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <GlobeIcon className="w-8 h-8 text-amber-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Social Creator</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Turn ideas into optimized posts for LinkedIn, Instagram & more.
                  </p>
                  <span className="mt-auto text-amber-500 font-bold text-sm tracking-wide opacity-80 group-hover:opacity-100 flex items-center gap-1">
                    GENERATE <span className="text-lg">&rarr;</span>
                  </span>
                </button>

             </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1121] text-gray-200 font-sans flex flex-col selection:bg-amber-500 selection:text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        
        {/* Global Tool Bar - Upload Section */}
        {activeTool !== 'home' && (
           <div className="mb-8 max-w-5xl mx-auto">
              <ImageUploader 
                compact
                onImageUpload={handleGlobalImageUpload}
                previewUrls={previewUrls}
                isConverting={isConverting}
              />
              {uploadError && (
                 <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm mt-3 px-4 py-2 rounded-lg">
                    {uploadError}
                 </div>
              )}
           </div>
        )}

        {renderTool()}
      </main>
      <Footer />
    </div>
  );
};

export default App;