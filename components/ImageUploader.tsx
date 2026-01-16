import React, { useState, useRef } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  label: string;
  onImageUpload: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/webp')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full group">
      <label className="block text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase font-sans">{label}</label>
      <div
        onClick={handleClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`aspect-[4/5] w-full rounded-2xl border-2 border-dashed transition-all duration-500 overflow-hidden relative flex flex-col items-center justify-center cursor-pointer shadow-sm
          ${isDragging 
            ? 'border-pink-500 bg-pink-50 scale-[0.98] shadow-inner' 
            : 'border-white/40 bg-white/30 backdrop-blur-md hover:border-pink-300 hover:bg-white/50 hover:shadow-xl hover:-translate-y-1'
          }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium px-6 py-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Replace Identity
                </span>
            </div>
          </>
        ) : (
          <div className="text-center p-6 flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full transition-all duration-500 ${isDragging ? 'bg-pink-500 text-white scale-110 rotate-12' : 'bg-white/50 text-gray-400 group-hover:text-pink-500 group-hover:bg-pink-100'}`}>
                <UploadIcon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-600 group-hover:text-pink-600 transition-colors">Select or Drop Photo</p>
              <p className="text-xs text-gray-400 mt-1">Clear facial portrait</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;