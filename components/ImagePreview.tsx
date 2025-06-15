import React from 'react';
import { ImageIcon } from './IconLib';

interface ImagePreviewProps {
  title: string;
  src: string | null;
  isEmpty?: boolean;
  emptyText?: string;
  className?: string; // Added className prop
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ title, src, isEmpty, emptyText = "Image will appear here", className }) => {
  return (
    <div className={`bg-slate-700/50 p-4 rounded-lg shadow-md h-80 flex flex-col items-center justify-center border border-slate-600 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-300 mb-3 self-start">{title}</h3>
      <div className="flex-grow flex items-center justify-center w-full h-full overflow-hidden rounded">
        {src ? (
          <img 
            src={src} 
            alt={title} 
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-center text-slate-500">
            {isEmpty && <ImageIcon className="w-16 h-16 mx-auto mb-2 text-slate-600" /> }
            <p>{isEmpty ? emptyText : "Awaiting image..."}</p>
          </div>
        )}
      </div>
    </div>
  );
};
