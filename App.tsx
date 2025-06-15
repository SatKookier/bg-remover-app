
import React, { useState, useCallback, ChangeEvent, useRef } from 'react';
import { UploadIcon, AlertTriangleIcon, InfoIcon, ImageIcon, SparklesIcon, DownloadIcon } from './components/IconLib';
import { FileUploadButton } from './components/FileUploadButton';
import { ImagePreview } from './components/ImagePreview';
import { Spinner } from './components/Spinner';
import { ActionButton } from './components/ActionButton';

const MAX_FILE_SIZE_MB = 30;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Helper function to convert hex color to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Helper function to calculate color difference
const colorDifference = (rgb1: {r: number, g: number, b: number}, rgb2: {r: number, g: number, b: number}): number => {
  return Math.abs(rgb1.r - rgb2.r) + Math.abs(rgb1.g - rgb2.g) + Math.abs(rgb1.b - rgb2.b);
};

const App: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [processedImageBase64, setProcessedImageBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewBg, setPreviewBg] = useState<'white' | 'black'>('white');
  
  const [isReadingFile, setIsReadingFile] = useState<boolean>(false);
  const [isProcessingLocally, setIsProcessingLocally] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
        setOriginalFile(null);
        setOriginalImagePreview(null);
        setProcessedImageBase64(null);
        return;
      }

      setOriginalFile(file);
      setError(null);
      setOriginalImagePreview(null);
      setProcessedImageBase64(null); // Reset processed image on new file upload
      setIsReadingFile(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImagePreview(reader.result as string);
        setIsReadingFile(false);
      };
      reader.onerror = () => {
        setError("Failed to read the file. It might be corrupted.");
        setOriginalFile(null);
        setIsReadingFile(false);
      }
      reader.readAsDataURL(file);
    }
  };

  const removeWhiteBackgroundLocally = useCallback(() => {
    if (!originalImagePreview) return;

    setIsProcessingLocally(true);
    setProcessedImageBase64(null);
    setError(null);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        setError("Could not get canvas context.");
        setIsProcessingLocally(false);
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const targetRgb = hexToRgb('#FFFFFF');
      if (!targetRgb) { // Should not happen for #FFFFFF
          setError("Internal error: Invalid fixed hex color for white background removal.");
          setIsProcessingLocally(false);
          return;
      }
      const actualTolerance = 30; // Fixed tolerance for simple white removal

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const diff = colorDifference({r,g,b}, targetRgb);
        if (diff <= actualTolerance) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedImageBase64(canvas.toDataURL('image/png'));
      setIsProcessingLocally(false);
    };
    img.onerror = () => {
      setError("Failed to load image for processing.");
      setIsProcessingLocally(false);
    }
    img.src = originalImagePreview;
  }, [originalImagePreview]);

  const handleDownloadProcessedImage = () => {
    if (!processedImageBase64 || !originalFile) return;
    const link = document.createElement('a');
    link.href = processedImageBase64;
    const fileName = originalFile.name.substring(0, originalFile.name.lastIndexOf('.')) || originalFile.name;
    link.download = `${fileName}_transparent_white_bg.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const acceptedFileTypes = ".png,.jpeg,.jpg,.webp,.bmp,.gif";
  const previewBackgroundClasses = { white: 'white-bg', black: 'black-bg' };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <header className="text-center mb-6 w-full max-w-5xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 flex items-center justify-center">
          <ImageIcon className="w-10 h-10 mr-3 text-indigo-400" />
          Free White Background Remover
        </h1>
        <p className="text-slate-400 mt-3 text-lg max-w-3xl mx-auto">
          Upload your image to remove its white (#FFFFFF) background, processed directly in your browser.
        </p>
      </header>

      <div className="ad-placeholder w-full max-w-5xl h-24 mb-6 mx-auto rounded-lg">
        Top Banner Ad Placeholder (e.g., 728x90 or responsive)
        <br/> <span className="text-xs">(Actual ad integration requires an ad network script)</span>
      </div>

      <main className="w-full max-w-5xl bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-10">
        <div className="mb-8">
          <FileUploadButton
            onChange={handleFileChange}
            accept={acceptedFileTypes}
            disabled={isReadingFile || isProcessingLocally}
          />
          <p className="text-xs text-slate-500 mt-2 text-center">
            Supported: PNG, JPEG, WEBP, BMP, GIF. Max file size: {MAX_FILE_SIZE_MB}MB.
          </p>
          {isReadingFile && (
             <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600 flex items-center text-slate-300 text-sm">
                <Spinner size="small"/> <span className="ml-2">Reading file...</span>
            </div>
          )}
          <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600 flex items-start text-slate-400 text-xs">
            <InfoIcon className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-sky-400" />
            <span>Upload an image with a white background. Click "Remove White Background" to process.</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-800/30 border border-red-700 rounded-lg text-red-300 flex items-center">
            <AlertTriangleIcon className="w-5 h-5 mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        {originalImagePreview && (
          <div className="mt-6 border-t border-slate-700 pt-6">
            <h2 className="text-2xl font-semibold text-sky-400 mb-1 text-center">Remove White Background</h2>
             <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600 text-xs text-slate-400 my-4 text-center">
                 <InfoIcon className="w-3 h-3 mr-1 inline"/> This tool is optimized for removing plain white (#FFFFFF) backgrounds using a fixed tolerance.
              </div>
            
            <ActionButton
              onClick={removeWhiteBackgroundLocally}
              disabled={isProcessingLocally || isReadingFile}
              className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white"
            >
              {isProcessingLocally ? <Spinner size="small"/> : <SparklesIcon className="w-5 h-5 mr-2" />}
              {isProcessingLocally ? 'Processing...' : 'Remove White Background'}
            </ActionButton>
             {isProcessingLocally && (
                <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600 flex items-center text-slate-300 text-sm justify-center">
                    <Spinner size="small"/> <span className="ml-2">Removing white background... Please wait.</span>
                </div>
            )}
          </div>
        )}

        <div className={`mt-8 grid grid-cols-1 ${originalImagePreview && processedImageBase64 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6`}>
          {originalImagePreview && (
            <div>
              <ImagePreview 
                title="Original Image" 
                src={originalImagePreview} 
                isEmpty={!originalImagePreview} 
                emptyText="Your uploaded image will appear here."
                className={`${previewBackgroundClasses[previewBg]}`}
              />
            </div>
          )}

          {processedImageBase64 && originalImagePreview && (
             <div>
                <ImagePreview 
                    title="Processed Image (Transparent)" 
                    src={processedImageBase64} 
                    className={`${previewBackgroundClasses[previewBg]}`}
                />
                 <ActionButton
                  onClick={handleDownloadProcessedImage}
                  disabled={!processedImageBase64}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
                >
                  <DownloadIcon className="w-5 h-5 mr-2" />
                  Download Transparent PNG
                </ActionButton>
            </div>
          )}
        </div>
        
        {(originalImagePreview || processedImageBase64) && ( // Show background toggle if either image is present
             <div className="mt-6 flex justify-center space-x-2 border-t border-slate-700 pt-6">
                <p className="text-sm text-slate-400 self-center mr-2">Preview Background:</p>
                {(['white', 'black'] as const).map(bg => (
                    <button 
                        key={bg}
                        onClick={() => setPreviewBg(bg)}
                        title={`Set preview to ${bg} background`}
                        aria-pressed={previewBg === bg}
                        className={`px-3 py-1 text-xs rounded ${previewBg === bg ? 'bg-sky-500 text-white' : 'bg-slate-600 hover:bg-slate-500 text-slate-300'} transition-colors`}
                    >
                       {bg.charAt(0).toUpperCase() + bg.slice(1)}
                    </button>
                ))}
            </div>
        )}


        {!originalImagePreview && !isReadingFile && !error && (
            <div className="text-center text-slate-500 py-10">
                <ImageIcon className="w-24 h-24 mx-auto mb-4 text-slate-600" />
                <p>Upload an image to get started.</p>
                <p className="text-sm mt-1">This tool will help you remove its white background.</p>
            </div>
        )}
        
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

        <div className="ad-placeholder w-full h-20 mt-10 rounded-lg">
          Bottom Ad Placeholder (e.g., responsive banner)
          <br/> <span className="text-xs">(Actual ad integration requires an ad network script)</span>
        </div>
      </main>

      <footer className="text-center mt-12 text-slate-500 text-sm w-full max-w-5xl px-4">
        <p>&copy; {new Date().getFullYear()} White Background Remover. All rights reserved (pending actual registration!).</p>
        <p className="mt-1">This tool processes images directly in your browser. No images are uploaded to a server for background removal.</p>
      </footer>
    </div>
  );
};

export default App;
