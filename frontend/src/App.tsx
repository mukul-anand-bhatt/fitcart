import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { NutritionAnalysis } from './components/NutritionAnalysis';
import { mockNutritionData } from './mockData';
import { ScanLine } from 'lucide-react';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
    // In a real app, you would send the image to the backend here
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <ScanLine className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Nutrition Scanner</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Upload Product Image</h2>
              <ImageUpload onImageUpload={handleImageUpload} />
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Example of nutrition label to scan:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img
                    src="namkeen.jpg"
                    alt="Example nutrition label"
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                  <p className="mt-2 text-xs text-gray-500 text-center">Upload a clear photo of the nutrition information panel, similar to the example above</p>
                </div>
              </div>
            </div>
            
            {selectedImage && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Selected Image</h2>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected product"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <NutritionAnalysis data={mockNutritionData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;