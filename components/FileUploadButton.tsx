import React, { ChangeEvent, useRef, useState } from 'react';
import { UploadIcon } from './IconLib';

interface FileUploadButtonProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  disabled?: boolean;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onChange, accept, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    const files = e.dataTransfer.files;
    if (files && files.length > 0 && inputRef.current) {
      // input要素にファイルをセットできないため、onChangeを直接呼ぶ
      const event = {
        target: { files },
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <label 
      htmlFor="file-upload" 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={
        `flex flex-col items-center justify-center w-full h-48 px-4 
        border-2 border-dashed rounded-xl 
        cursor-pointer transition-colors duration-200 ease-in-out
        ${disabled ? 'opacity-50 cursor-not-allowed border-slate-600 bg-slate-700/50' : dragActive ? 'border-sky-400 bg-slate-600/50' : 'border-slate-600 bg-slate-700/50 hover:bg-slate-700/80'}`
      }
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
        ref={inputRef}
      />
    </label>
  );
};
