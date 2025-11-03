
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-xs text-gray-500">
        <p className="mb-2">
          By uploading your photo you confirm you have rights to the image and permit processing by this app. Your image will not be used to train other models without your explicit consent.
        </p>
        <p>
          Outputs generated via the model may include an invisible SynthID watermark as per model policy.
        </p>
      </div>
    </footer>
  );
};
