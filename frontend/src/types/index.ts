export interface Ingredient {
  main: string[];
  additives?: string[];
}

export interface NutritionalValue {
  energy?: number;
  energy_kcal?: number;
  protein?: number;
  protein_g?: number;
  carbohydrate?: number;
  carbohydrate_g?: number;
  total_sugars?: number;
  total_sugars_g?: number;
  total_fat?: number;
  total_fat_g?: number;
  saturated_fat?: number;
  saturated_fat_g?: number;
  sodium?: number;
  sodium_mg?: number;
  cholesterol?: number | string;
  cholesterol_mg?: number | string;
  vitamins?: Record<string, number | string> | string;
  minerals?: Record<string, number | string> | string;
}

export interface ServingInfo {
  serving_size: string;
  servings_per_pack: number | string;
}

export interface NutrientExceedance {
  saturated_fat: "Yes" | "No";
  sodium: "Yes" | "No";
  sugar?: "Yes" | "No";
  cholesterol?: "Yes" | "No";
}

export interface HealthAnalysis {
  nutrient_exceedances: NutrientExceedance;
  summary: string;
  max_daily_consumption?: {
    by_calories?: string;
    by_sugar?: string;
    by_sodium?: string;
    by_saturated_fat?: string;
    recommended?: string;
  };
}

export interface FoodProduct {
  "Product Name": string;
  Ingredients: Ingredient;
  "Nutritional Facts": {
    per_100g: NutritionalValue;
    per_serving: NutritionalValue;
  };
  "Serving Information": ServingInfo;
  "Health Analysis": HealthAnalysis;
}