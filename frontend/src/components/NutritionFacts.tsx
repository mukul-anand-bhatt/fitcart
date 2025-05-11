import React, { useState, useEffect } from 'react';
import { NutritionalValue } from '../types';
import { calculatePercentage, dailyRecommendedValues, getNutrientValue } from '../utils/healthAnalysis';
import ProgressBar from './ProgressBar';

interface NutritionFactsProps {
  per100g: NutritionalValue;
  perServing: NutritionalValue;
  servingSize: string;
}

const NutritionFacts: React.FC<NutritionFactsProps> = ({ 
  per100g, 
  perServing,
  servingSize 
}) => {
  const [viewMode, setViewMode] = useState<'100g' | 'serving'>('serving');
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  const currentValues = viewMode === '100g' ? per100g : perServing;
  
  const getEnergyKcal = (): number => {
    return currentValues.energy_kcal || 
           (currentValues.energy ? currentValues.energy : 0);
  };
  
  const getNutrientPercentage = (nutrient: string, dailyValue: number): number => {
    const value = getNutrientValue(currentValues, nutrient);
    return calculatePercentage(value, dailyValue);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Nutrition Facts</h3>
        <div className="flex bg-gray-100 rounded-md overflow-hidden">
          <button
            className={`px-3 py-1 text-sm transition-colors ${
              viewMode === 'serving' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setViewMode('serving')}
          >
            Per Serving
          </button>
          <button
            className={`px-3 py-1 text-sm transition-colors ${
              viewMode === '100g' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setViewMode('100g')}
          >
            Per 100g
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">
        {viewMode === 'serving' 
          ? `Values per serving (${servingSize})` 
          : 'Values per 100g'}
      </p>
      
      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Calories</span>
          <span>{getEnergyKcal()} kcal</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <ProgressBar 
              percentage={getNutrientPercentage('protein', dailyRecommendedValues.protein)}
              label="Protein"
              animate={animate}
            />
          </div>
          
          <div>
            <ProgressBar 
              percentage={getNutrientPercentage('carbohydrate', dailyRecommendedValues.carbs)}
              label="Carbohydrates"
              animate={animate}
            />
          </div>
          
          <div>
            <ProgressBar 
              percentage={getNutrientPercentage('total_sugars', dailyRecommendedValues.sugar)}
              label="Sugars"
              animate={animate}
            />
          </div>
          
          <div>
            <ProgressBar 
              percentage={getNutrientPercentage('total_fat', dailyRecommendedValues.totalFat)}
              label="Total Fat"
              animate={animate}
            />
          </div>
          
          <div>
            <ProgressBar 
              percentage={getNutrientPercentage('saturated_fat', dailyRecommendedValues.saturatedFat)}
              label="Saturated Fat"
              animate={animate}
            />
          </div>
          
          <div>
            <ProgressBar 
              percentage={getNutrientPercentage('sodium', dailyRecommendedValues.sodium)}
              label="Sodium"
              animate={animate}
            />
          </div>
          
          {(currentValues.cholesterol || currentValues.cholesterol_mg) && (
            <div>
              <ProgressBar 
                percentage={getNutrientPercentage('cholesterol', dailyRecommendedValues.cholesterol)}
                label="Cholesterol"
                animate={animate}
              />
            </div>
          )}
        </div>
        
        {/* Vitamins & Minerals */}
        <div className="pt-3">
          <h4 className="text-sm font-medium mb-2">Vitamins & Minerals</h4>
          <div className="text-sm text-gray-600">
            {typeof currentValues.vitamins === 'object' && currentValues.vitamins !== null ? (
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(currentValues.vitamins).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace('_', ' ')}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Vitamins: {currentValues.vitamins || 'Not Specified'}</p>
            )}
            
            {typeof currentValues.minerals === 'object' && currentValues.minerals !== null ? (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(currentValues.minerals).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace('_', ' ')}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-1">Minerals: {currentValues.minerals || 'Not Specified'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionFacts;