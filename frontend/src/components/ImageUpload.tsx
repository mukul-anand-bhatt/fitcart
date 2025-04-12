import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <div className="mt-4">
        <label htmlFor="file-upload" className="cursor-pointer">
          <span className="mt-2 block text-sm font-medium text-gray-900">
            Drop an image here, or click to upload
          </span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
          />
        </label>
        <p className="mt-1 text-xs text-gray-500">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  );
};