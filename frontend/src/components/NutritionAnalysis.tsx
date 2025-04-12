import React from 'react';
import { NutritionData, dailyRecommended } from '../types';
import { NutrientBar } from './NutrientBar';

interface NutritionAnalysisProps {
  data: NutritionData;
}

export const NutritionAnalysis: React.FC<NutritionAnalysisProps> = ({ data }) => {
  const parseValue = (value: string): number => {
    return parseFloat(value.replace(/[^0-9.]/g, ''));
  };

  const getRecommendationMessage = () => {
    const nutrients = [
      { name: 'calories', value: parseValue(data['Nutritional Facts'].per_serving.energy), max: dailyRecommended.calories },
      { name: 'carbs', value: parseValue(data['Nutritional Facts'].per_serving.carbohydrate), max: dailyRecommended.carbs },
      { name: 'protein', value: parseValue(data['Nutritional Facts'].per_serving.protein), max: dailyRecommended.protein },
      { name: 'fat', value: parseValue(data['Nutritional Facts'].per_serving.total_fat), max: dailyRecommended.fat },
      { name: 'sugar', value: parseValue(data['Nutritional Facts'].per_serving.total_sugars), max: dailyRecommended.totalSugar },
      { name: 'sodium', value: parseValue(data['Nutritional Facts'].per_serving.sodium), max: dailyRecommended.sodium },
      { name: 'saturated fat', value: parseValue(data['Nutritional Facts'].per_serving.saturated_fat), max: dailyRecommended.saturatedFat },
      { name: 'cholesterol', value: parseValue(data['Nutritional Facts'].per_serving.cholesterol), max: dailyRecommended.cholesterol }
    ];

    const high = nutrients.filter(n => (n.value / n.max) * 100 > 50);
    const moderate = nutrients.filter(n => (n.value / n.max) * 100 > 20 && (n.value / n.max) * 100 <= 50);

    if (high.length > 0) {
      return {
        type: 'warning',
        message: `⚠️ High in ${high.map(n => n.name).join(', ')}. Consider alternatives.`
      };
    }

    if (moderate.length >= 2) {
      return {
        type: 'caution',
        message: `⚠️ Moderate in ${moderate.map(n => n.name).join(', ')}. Track intake.`
      };
    }

    return {
      type: 'safe',
      message: '✅ Safe to consume in moderation.'
    };
  };

  const recommendation = getRecommendationMessage();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
        <p className="text-gray-700">{data.Ingredients.description}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Serving Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Serving Size</p>
            <p className="font-medium">{data['Serving Information'].serving_size}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Servings Per Pack</p>
            <p className="font-medium">{data['Serving Information'].servings_per_pack}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Nutritional Analysis (per serving)</h2>
        <div className="space-y-4">
          <NutrientBar
            label="Calories"
            value={parseValue(data['Nutritional Facts'].per_serving.energy)}
            maxValue={dailyRecommended.calories}
            unit="kcal"
          />
          <NutrientBar
            label="Carbohydrates"
            value={parseValue(data['Nutritional Facts'].per_serving.carbohydrate)}
            maxValue={dailyRecommended.carbs}
            unit="g"
          />
          <NutrientBar
            label="Protein"
            value={parseValue(data['Nutritional Facts'].per_serving.protein)}
            maxValue={dailyRecommended.protein}
            unit="g"
          />
          <NutrientBar
            label="Total Fat"
            value={parseValue(data['Nutritional Facts'].per_serving.total_fat)}
            maxValue={dailyRecommended.fat}
            unit="g"
          />
          <NutrientBar
            label="Total Sugars"
            value={parseValue(data['Nutritional Facts'].per_serving.total_sugars)}
            maxValue={dailyRecommended.totalSugar}
            unit="g"
          />
          <NutrientBar
            label="Sodium"
            value={parseValue(data['Nutritional Facts'].per_serving.sodium)}
            maxValue={dailyRecommended.sodium}
            unit="mg"
          />
          <NutrientBar
            label="Saturated Fat"
            value={parseValue(data['Nutritional Facts'].per_serving.saturated_fat)}
            maxValue={dailyRecommended.saturatedFat}
            unit="g"
          />
          <NutrientBar
            label="Cholesterol"
            value={parseValue(data['Nutritional Facts'].per_serving.cholesterol)}
            maxValue={dailyRecommended.cholesterol}
            unit="mg"
          />
        </div>
      </div>

      <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
        recommendation.type === 'warning' ? 'border-red-500' :
        recommendation.type === 'caution' ? 'border-yellow-500' :
        'border-green-500'
      }`}>
        <h2 className="text-xl font-semibold mb-2">Recommendation</h2>
        <p className="text-gray-700">{recommendation.message}</p>
      </div>
    </div>
  );
};