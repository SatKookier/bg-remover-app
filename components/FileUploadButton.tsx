
import React, { ChangeEvent } from 'react';
import { UploadIcon } from './IconLib';

interface FileUploadButtonProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  disabled?: boolean;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onChange, accept, disabled }) => {
  return (
    <label 
      htmlFor="file-upload" 
      className={`
        flex flex-col items-center justify-center w-full h-48 px-4 
        border-2 border-dashed border-slate-600 rounded-xl 
        cursor-pointer bg-slate-700/50 hover:bg-slate-700/80 
        transition-colors duration-200 ease-in-out
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <UploadIcon className="w-12 h-12 text-sky-400 mb-3" />
      <span className="text-lg font-semibold text-slate-300">Click to upload your logo</span>
      <span className="text-sm text-slate-400">or drag and drop</span>
      <input 
        id="file-upload" 
        type="file" 
        className="hidden" 
        onChange={onChange} 
        accept={accept}
        disabled={disabled} 
      />
    </label>
  );
};
