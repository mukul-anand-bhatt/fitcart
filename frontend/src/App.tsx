import React, { useState } from 'react';
import { sampleProduct } from './data/sampleProduct';
import { FoodProduct } from './types';
import ProductHeader from './components/ProductHeader';
import IngredientsList from './components/IngredientsList';
import NutritionFacts from './components/NutritionFacts';
import HealthSummary from './components/HealthSummary';
import ProductSelector from './components/ProductSelector';

function App() {
  const [product, setProduct] = useState<FoodProduct>(sampleProduct);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-green-600 to-blue-600 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl font-bold text-white">
            Food Health Analyzer
          </h1>
          <p className="text-green-50 mt-1">
            Detailed nutritional analysis and health recommendations
          </p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ProductSelector onSelectProduct={setProduct} />
        
        <ProductHeader 
          productName={product["Product Name"]} 
          servingInfo={product["Serving Information"]} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <IngredientsList ingredients={product.Ingredients} />
            <HealthSummary 
              healthAnalysis={product["Health Analysis"]} 
              product={product}
            />
          </div>
          <div>
            <NutritionFacts 
              per100g={product["Nutritional Facts"].per_100g}
              perServing={product["Nutritional Facts"].per_serving}
              servingSize={product["Serving Information"].serving_size}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-center text-gray-500 text-sm">
            Food Health Analyzer - Nutritional analysis based on standard dietary guidelines
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;