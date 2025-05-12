import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { FoodProduct } from '../types';
import { sampleProduct } from '../data/sampleProduct';

interface ProductSelectorProps {
  onSelectProduct: (product: FoodProduct) => void;
  onLoadingStateChange: (isLoading: boolean) => void;
}

const BACKEND_URL = 'https://fitcart.onrender.com/extract-data/';

const ProductSelector: React.FC<ProductSelectorProps> = ({ 
  onSelectProduct,
  onLoadingStateChange
}) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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

    // Create URL for preview
    setSelectedImage(URL.createObjectURL(file));

    onLoadingStateChange(true); // Notify parent component
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
      onSelectProduct(sampleProduct);
    } finally {
      onLoadingStateChange(false); // Notify parent component
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Upload Product Image for Analysis
        </h3>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Sample Image */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sample Image</h4>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src="/hello7.jpg"
                alt="Sample nutrition label"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Upload Section */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Upload
            </h4>
            <label className="relative cursor-pointer w-full">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <div className={`
                flex flex-col items-center justify-center w-full aspect-square
                border-2 border-dashed rounded-lg transition-colors
                ${selectedImage ? 'p-0' : 'p-6'}
                border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400
              `}>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded nutrition label"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Click to upload product image
                    </span>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center gap-2 w-full">
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
            <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSelector;