import React, { useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { ImageIcon } from './icons/ImageIcon';

interface ImageUploaderProps {
  onImageUpload: (files: File[]) => void;
  previewUrls: string[];
  isConverting?: boolean;
  compact?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUpload, 
  previewUrls, 
  isConverting, 
  compact = false 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onImageUpload(Array.from(event.target.files));
    }
  };

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onImageUpload(Array.from(event.dataTransfer.files));
    }
  }, [onImageUpload]);

  const handleLabelClick = () => {
    inputRef.current?.click();
  };

  // Compact Mode (Minimal Top Bar)
  if (compact) {
    return (
        <div className="w-full bg-[#0F1623] rounded-xl border border-gray-800 p-4 flex items-center gap-5 shadow-lg animate-fade-in">
             <input
                id="file-upload-compact"
                type="file"
                multiple
                className="hidden"
                ref={inputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            />
            
            <button 
                onClick={handleLabelClick}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-lg transition-colors flex-shrink-0 shadow-md"
            >
                {isConverting ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                    <UploadIcon className="w-5 h-5" />
                )}
                {previewUrls.length > 0 ? 'Change Photos' : 'Upload Photos'}
            </button>

            <div className="h-10 w-px bg-gray-800 mx-1 hidden sm:block"></div>

            <div className="flex-1 overflow-x-auto flex items-center gap-3 no-scrollbar">
                {previewUrls.length === 0 ? (
                    <span className="text-sm text-gray-500 font-medium italic">Select photos to begin...</span>
                ) : (
                    previewUrls.map((url, idx) => (
                        <div key={idx} className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-gray-700 shadow-sm group">
                            <img src={url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                        </div>
                    ))
                )}
            </div>
            
            {previewUrls.length > 0 && (
                <div className="text-xs font-bold text-gray-500 hidden sm:block whitespace-nowrap bg-gray-800/50 px-3 py-1 rounded-full">
                    {previewUrls.length} loaded
                </div>
            )}
        </div>
    );
  }

  // Default Large Mode
  return (
    <div className="w-full">
      <label 
        htmlFor="file-upload" 
        className={`relative block w-full aspect-video rounded-xl border-2 border-dashed border-gray-700 bg-gray-900/30 flex justify-center items-center cursor-pointer hover:border-amber-500/50 hover:bg-gray-800/50 transition-all duration-300 overflow-hidden ${previewUrls.length > 0 ? 'p-0' : 'p-12'}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isConverting && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 text-center p-4 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            <p className="text-white mt-4 font-semibold">Processing Images...</p>
          </div>
        )}
        
        {previewUrls.length > 0 ? (
          <div className="w-full h-full relative group">
            {previewUrls.length === 1 ? (
               <img src={previewUrls[0]} alt="Preview" className="object-contain w-full h-full bg-[#0F1623]" />
            ) : (
               <div className="w-full h-full grid grid-cols-2 gap-1 bg-[#0F1623] p-1">
                 {previewUrls.slice(0, 4).map((url, index) => (
                   <div key={index} className="relative w-full h-full overflow-hidden rounded-sm">
                      <img src={url} alt={`Preview ${index}`} className="object-cover w-full h-full" />
                      {index === 3 && previewUrls.length > 4 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xl">
                          +{previewUrls.length - 4}
                        </div>
                      )}
                   </div>
                 ))}
               </div>
            )}
            
            <div 
              onClick={(e) => { e.preventDefault(); handleLabelClick(); }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 backdrop-blur-sm"
            >
              <span className="text-white text-lg font-bold bg-amber-500 px-6 py-2 rounded-full shadow-xl">Change Images</span>
            </div>
          </div>
        ) : (
          <div className="text-center group">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-700 transition-colors">
                 <UploadIcon className="h-10 w-10 text-amber-500" />
            </div>
            <span className="mt-2 block text-lg font-bold text-gray-200">
              Drop photos here
            </span>
             <p className="text-sm text-gray-500 mt-2">or click to browse</p>
          </div>
        )}
      </label>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        multiple
        className="sr-only"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
      />
    </div>
  );
};