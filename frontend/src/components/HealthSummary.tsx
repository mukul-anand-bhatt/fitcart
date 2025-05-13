import React from 'react';
import { HealthAnalysis } from '../types';
import { calculateHealthScore, getHealthScoreColor } from '../utils/healthAnalysis';
import { FoodProduct } from '../types';

interface HealthSummaryProps {
  healthAnalysis: HealthAnalysis;
  product: FoodProduct;
}

const HealthSummary: React.FC<HealthSummaryProps> = ({ healthAnalysis, product }) => {
  const healthScore = calculateHealthScore(product);
  const scoreColor = getHealthScoreColor(healthScore);
  
  const getScoreDescription = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Very Good';
    if (score >= 60) return 'Good';
    if (score >= 50) return 'Fair';
    if (score >= 30) return 'Poor';
    if (!score) return 'Refer Health Summary';
    return 'Concerning';
  };
  
  const getExceedanceIcon = (status: 'Yes' | 'No') => {
    return status === 'Yes' ? (
      <span className="text-red-500 dark:text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
        </svg>
      </span>
    ) : (
      <span className="text-green-500 dark:text-green-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Health Analysis</h3>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Health Score</h4>
          <div className="flex items-center">
            <div 
              className="rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl mr-3"
              style={{ backgroundColor: scoreColor }}
            >
              {healthScore}
            </div>
            <div>
              <p className="font-medium" style={{ color: scoreColor }}>
                {getScoreDescription(healthScore)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">out of 100</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nutrient Exceedances</h4>
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="mr-2">{getExceedanceIcon(healthAnalysis.nutrient_exceedances.saturated_fat)}</span>
              <span className="text-sm dark:text-gray-300">Saturated Fat</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">{getExceedanceIcon(healthAnalysis.nutrient_exceedances.sodium)}</span>
              <span className="text-sm dark:text-gray-300">Sodium</span>
            </div>
            {healthAnalysis.nutrient_exceedances.sugar && (
              <div className="flex items-center">
                <span className="mr-2">{getExceedanceIcon(healthAnalysis.nutrient_exceedances.sugar)}</span>
                <span className="text-sm dark:text-gray-300">Sugar</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Health Summary</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{healthAnalysis.summary}</p>
      </div>
      
      {/* {healthAnalysis.max_daily_consumption && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommended Daily Consumption</h4>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md p-3">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
              {healthAnalysis.max_daily_consumption.recommended}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
              {healthAnalysis.max_daily_consumption.by_calories && (
                <div className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>By Calories: {healthAnalysis.max_daily_consumption.by_calories}</span>
                </div>
              )}
              {healthAnalysis.max_daily_consumption.by_sugar && (
                <div className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>By Sugar: {healthAnalysis.max_daily_consumption.by_sugar}</span>
                </div>
              )}
              {healthAnalysis.max_daily_consumption.by_saturated_fat && (
                <div className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>By Saturated Fat: {healthAnalysis.max_daily_consumption.by_saturated_fat}</span>
                </div>
              )}
              {healthAnalysis.max_daily_consumption.by_sodium && (
                <div className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>By Sodium: {healthAnalysis.max_daily_consumption.by_sodium}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )} */}

    </div>
  );
};

export default HealthSummary;