import { useState } from 'react';
import { sampleProduct } from './data/sampleProduct';
import { FoodProduct } from './types';
import ProductHeader from './components/ProductHeader';
import IngredientsList from './components/IngredientsList';
import NutritionFacts from './components/NutritionFacts';
import HealthSummary from './components/HealthSummary';
import ProductSelector from './components/ProductSelector';

function App() {
  const [product, setProduct] = useState<FoodProduct>(sampleProduct);
  const [isLoading, setIsLoading] = useState(false);

  const handleProductSelect = async (product: FoodProduct) => {
    setProduct(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors relative">
      {/* Loading Overlay - now controlled by ProductSelector's state */}
      
      <header className="bg-gradient-to-r from-green-600 to-blue-600 shadow-md relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className=" flex justify-center items-center">
            <div>
              <h1 className="text-2xl font-bold text-white ">
                Food Health Analyzer
              </h1>
              <p className="text-green-50 mt-1">
                Detailed nutritional analysis and health recommendations
              </p>
            </div>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ProductSelector 
          onSelectProduct={handleProductSelect}
          onLoadingStateChange={setIsLoading} // Pass loading state setter
        />
        
        <ProductHeader 
          productName={product["Product Name"]} 
          servingInfo={product["Serving Information"]} 
          isLoading={isLoading}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <HealthSummary 
              healthAnalysis={product["Health Analysis"]} 
              product={product}
            />
            <IngredientsList 
              ingredients={product.Ingredients} 
            />
          </div>
          <div>
            <NutritionFacts 
              per100g={product["Nutritional Facts"].per_100g}
              perServing={product["Nutritional Facts"].per_serving}
              servingSize={product["Serving Information"].serving_size}
              maxDailyConsumption={product["Health Analysis"].max_daily_consumption}
            />
          </div>
        </div>
      </main>
      
      {/* Loading Overlay - moved here to appear above everything */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-800 dark:text-gray-200">Analyzing product data...</p>
          </div>
        </div>
      )}
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            Food Health Analyzer - Nutritional analysis based on standard dietary guidelines
          </p>
        </div>
      </footer>
      {/* <Analytics /> */}
    </div>
  );
}

export default App;





