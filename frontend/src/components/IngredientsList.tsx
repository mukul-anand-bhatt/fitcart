import React from 'react';
import { Ingredient } from '../types';

interface IngredientsListProps {
  ingredients: Ingredient;
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Ingredients</h3>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main Ingredients</h4>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
          {ingredients.main.map((ingredient, index) => (
            <li key={index} className="text-sm">{ingredient}</li>
          ))}
        </ul>
      </div>
      
      {ingredients.additives && ingredients.additives.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additives</h4>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
            {ingredients.additives.map((additive, index) => (
              <li key={index} className="text-sm">{additive}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IngredientsList;