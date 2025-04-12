export interface NutritionData {
  Ingredients: {
    description: string;
    percentages: string;
  };
  "Nutritional Facts": {
    per100g: NutrientValues;
    per_serving: NutrientValues;
    vitamins_minerals: string;
  };
  "Serving Information": {
    serving_size: string;
    servings_per_pack: string;
  };
  "Health Analysis": {
    nutrients_exceeding_recommendations: string;
    maximum_daily_consumption: {
      total_calories: string;
      sugar_content: string;
      sodium_levels: string;
      saturated_trans_fats: string;
    };
    consumption_summary: string;
  };
}

export interface NutrientValues {
  energy: string;
  protein: string;
  carbohydrate: string;
  total_sugars: string;
  added_sugars: string;
  total_fat: string;
  saturated_fat: string;
  trans_fat: string;
  cholesterol: string;
  dietary_fibre: string;
  sodium: string;
}

export const dailyRecommended = {
  calories: 2000,
  carbs: 300,
  protein: 50,
  fat: 65,
  totalSugar: 50,
  sodium: 2300,
  saturatedFat: 20,
  cholesterol: 300,
};