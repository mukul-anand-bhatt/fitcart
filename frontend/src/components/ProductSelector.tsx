import React, { useState, useEffect } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { FoodProduct } from '../types';
import { sampleProduct } from '../data/sampleProduct';

interface ProductSelectorProps {
  onSelectProduct: (product: FoodProduct) => void;
}

const BACKEND_URL = 'https://fitcart.onrender.com/extract-data/';

const ProductSelector: React.FC<ProductSelectorProps> = ({ onSelectProduct }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isBackendAvailable) {
      setError('Backend service is not available. Using sample data instead.');
      onSelectProduct(sampleProduct);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image_file', file);

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      onSelectProduct(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Unable to analyze image: ${errorMessage}. Using sample data instead.`);
      console.error('Error:', err);
      onSelectProduct(sampleProduct); // Fallback to sample data
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Upload Product Image for Analysis
        </h3>
        
        {!isBackendAvailable && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-yellow-700">
              Backend service is currently unavailable. Upload will use sample data.
            </span>
          </div>
        )}

        <label className="relative cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isLoading}
          />
          <div className={`
            flex flex-col items-center justify-center w-full p-6 
            border-2 border-dashed rounded-lg transition-colors
            ${isLoading ? 'border-gray-400 bg-gray-50' : 'border-gray-300 hover:border-blue-500'}
          `}>
            <Upload className={`w-8 h-8 mb-2 ${isLoading ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className="text-sm text-gray-500">
              {isLoading ? 'Analyzing...' : 'Click to upload product image'}
            </span>
          </div>
        </label>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSelector;