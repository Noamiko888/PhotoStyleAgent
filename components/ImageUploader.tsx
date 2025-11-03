import React, { useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl: string | null;
  isConverting?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl, isConverting }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onImageUpload(event.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleLabelClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label 
        htmlFor="file-upload" 
        className={`relative block w-full aspect-video rounded-lg border-2 border-dashed border-gray-600 flex justify-center items-center cursor-pointer hover:border-indigo-500 transition-colors duration-300 ${previewUrl ? 'p-0' : 'p-12'}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isConverting && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10 text-center p-4 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
            <p className="text-white mt-4 font-semibold">Converting HEIC image...</p>
          </div>
        )}
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="object-contain w-full h-full rounded-md" />
            <div 
              onClick={(e) => { e.preventDefault(); handleLabelClick(); }}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            >
              <span className="text-white text-lg font-semibold">Change Image</span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
            <span className="mt-2 block text-sm font-medium text-gray-400">
              Drag & drop a photo of yourself
            </span>
             <p className="text-xs text-gray-500">For best results, use a well-lit headshot</p>
          </div>
        )}
      </label>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
      />
    </div>
  );
};
