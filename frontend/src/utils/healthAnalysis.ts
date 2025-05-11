import { FoodProduct, NutritionalValue } from '../types';

// Daily recommended values (based on standard guidelines)
export const dailyRecommendedValues = {
  calories: 2000, // kcal
  protein: 50, // g
  carbs: 300, // g
  sugar: 50, // g
  totalFat: 65, // g
  saturatedFat: 20, // g
  sodium: 2300, // mg
  cholesterol: 300, // mg
};

// Function to calculate percentage of daily value
export const calculatePercentage = (value: number, dailyValue: number): number => {
  return Math.round((value / dailyValue) * 100);
};

// Function to get nutrient value regardless of naming convention
export const getNutrientValue = (
  nutritionalFacts: NutritionalValue,
  nutrientBase: string
): number => {
  const exactKey = nutrientBase as keyof NutritionalValue;
  const withUnitKey = `${nutrientBase}_g` as keyof NutritionalValue;
  const withMgKey = `${nutrientBase}_mg` as keyof NutritionalValue;
  const withKcalKey = `${nutrientBase}_kcal` as keyof NutritionalValue;

  if (nutritionalFacts[exactKey] !== undefined) {
    return nutritionalFacts[exactKey] as number;
  }
  if (nutritionalFacts[withUnitKey] !== undefined) {
    return nutritionalFacts[withUnitKey] as number;
  }
  if (nutritionalFacts[withMgKey] !== undefined) {
    return nutritionalFacts[withMgKey] as number;
  }
  if (nutritionalFacts[withKcalKey] !== undefined) {
    return nutritionalFacts[withKcalKey] as number;
  }

  return 0;
};

// Calculate health score (0-100) based on nutritional values
export const calculateHealthScore = (product: FoodProduct): number => {
  const per100g = product["Nutritional Facts"].per_100g;
  
  // Base scores (positive factors)
  let score = 50; // Start at neutral
  
  // Protein is good (up to 30% daily value in 100g is ideal)
  const proteinValue = getNutrientValue(per100g, 'protein');
  const proteinScore = Math.min(proteinValue / dailyRecommendedValues.protein * 100, 30) / 30 * 10;
  score += proteinScore;
  
  // Penalties (negative factors)
  // Sugar penalty (more than 10% daily value in 100g starts to be concerning)
  const sugarValue = getNutrientValue(per100g, 'total_sugars');
  const sugarPenalty = Math.min(sugarValue / dailyRecommendedValues.sugar * 100, 50) / 50 * 15;
  score -= sugarPenalty;
  
  // Saturated fat penalty
  const satFatValue = getNutrientValue(per100g, 'saturated_fat');
  const satFatPenalty = Math.min(satFatValue / dailyRecommendedValues.saturatedFat * 100, 75) / 75 * 20;
  score -= satFatPenalty;
  
  // Sodium penalty
  const sodiumValue = getNutrientValue(per100g, 'sodium');
  const sodiumPenalty = Math.min(sodiumValue / dailyRecommendedValues.sodium * 100, 50) / 50 * 15;
  score -= sodiumPenalty;
  
  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, Math.round(score)));
};

// Get color based on health score
export const getHealthScoreColor = (score: number): string => {
  if (score >= 80) return '#10B981'; // Healthy - Green
  if (score >= 60) return '#22C55E'; // Fairly healthy - Light Green
  if (score >= 40) return '#F97316'; // Moderate - Orange
  if (score >= 20) return '#F59E0B'; // Concerning - Amber
  return '#EF4444'; // Unhealthy - Red
};

// Get color for nutrient percentage
export const getNutrientColor = (percentage: number): string => {
  if (percentage <= 10) return '#10B981'; // Very low - Green
  if (percentage <= 25) return '#22C55E'; // Low - Light Green  
  if (percentage <= 50) return '#3B82F6'; // Moderate - Blue
  if (percentage <= 75) return '#F97316'; // High - Orange
  return '#EF4444'; // Very high - Red
};