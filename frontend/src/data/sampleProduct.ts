import { FoodProduct } from '../types';

export const sampleProduct: FoodProduct = {
  "Product Name": "Sample Product - MAGGI Masala Noodles",
  "Ingredients": {
    "main": [
      "Wheat gluten",
      "Thickeners (508 & 407)",
      "Coriander powder",
      "Turmeric powder",
      "Ginger powder",
      "Nutmeg powder",
      "Cardamom powder",
      "Palm oil",
      "Roasted onion flakes",
      "Sugar",
      "Salt",
      "Acidity regulators"
    ],
    "additives": [
      "Thickeners (508 & 407)",
      "Acidity regulators"
    ]
  },
  "Nutritional Facts": {
    "per_100g": {
      "energy_kcal": 384,
      "protein_g": 8.2,
      "carbohydrate_g": 59.6,
      "total_sugars_g": 13.8,
      "total_fat_g": 12.5,
      "saturated_fat_g": 8.8,
      "sodium_mg": 1028.3,
      "cholesterol_mg": "Not Specified",
      "vitamins": "Not Specified",
      "minerals": "Not Specified"
    },
    "per_serving": {
      "energy_kcal": 269,
      "protein_g": 5.7,
      "carbohydrate_g": 41.7,
      "total_sugars_g": 9.7,
      "total_fat_g": 8.8,
      "saturated_fat_g": 6.2,
      "sodium_mg": 719.8,
      "cholesterol_mg": "Not Specified",
      "vitamins": "Not Specified",
      "minerals": "Not Specified"
    }
  },
  "Serving Information": {
    "serving_size": "70 g",
    "servings_per_pack": 8
  },
  "Health Analysis": {
    "nutrient_exceedances": {
      "saturated_fat": "Yes",
      "sodium": "Yes"
    },
    "summary": "This product is relatively high in saturated fat and sodium. While it provides some protein and carbohydrates, consumers should be mindful of portion size and overall sodium intake as part of a balanced diet. The iron content is a positive aspect.",
    "max_daily_consumption": {
      "by_calories": "7-8 servings (based on 2000 kcal diet)",
      "by_sugar": "5 servings (to stay within 50g daily sugar limit)",
      "by_sodium": "2-3 servings (to stay within 2300mg daily sodium limit)",
      "by_saturated_fat": "2-3 servings (to stay within 20g daily saturated fat limit)",
      "recommended": "1-2 servings daily due to high sodium and saturated fat content"
    }
  }
};

// Additional sample for demonstration
export const chocolateBarSample: FoodProduct = {
  "Product Name": "Premium Dark Chocolate Bar (70% Cocoa)",
  "Ingredients": {
    "main": ["Cocoa Mass", "Cocoa Butter", "Sugar", "Vanilla Extract"],
    "additives": ["Soy Lecithin (Emulsifier)"]
  },
  "Nutritional Facts": {
    "per_100g": {
      "energy_kcal": 598,
      "protein_g": 7.8,
      "carbohydrate_g": 45.2,
      "total_sugars_g": 30.1,
      "total_fat_g": 43.1,
      "saturated_fat_g": 25.2,
      "sodium_mg": 10,
      "cholesterol_mg": 0,
      "vitamins": {
        "vitamin_k": "3% DV"
      },
      "minerals": {
        "iron": "12% DV",
        "magnesium": "36% DV",
        "copper": "31% DV"
      }
    },
    "per_serving": {
      "energy_kcal": 179,
      "protein_g": 2.3,
      "carbohydrate_g": 13.6,
      "total_sugars_g": 9.0,
      "total_fat_g": 12.9,
      "saturated_fat_g": 7.6,
      "sodium_mg": 3,
      "cholesterol_mg": 0,
      "vitamins": {
        "vitamin_k": "1% DV"
      },
      "minerals": {
        "iron": "4% DV",
        "magnesium": "11% DV",
        "copper": "9% DV"
      }
    }
  },
  "Serving Information": {
    "serving_size": "30g (1 oz)",
    "servings_per_pack": 3
  },
  "Health Analysis": {
    "nutrient_exceedances": {
      "saturated_fat": "Yes",
      "sodium": "No"
    },
    "summary": "This dark chocolate is high in beneficial antioxidants but also high in saturated fat. Contains moderate sugar and significant amounts of magnesium and copper. Best consumed in small amounts (1-2 squares) as an occasional treat rather than daily consumption.",
    "max_daily_consumption": {
      "by_calories": "3-4 squares (30g total, based on 2000 kcal diet)",
      "by_sugar": "5-6 squares (based on 50g daily sugar limit)",
      "by_sodium": "No limitation (very low sodium)",
      "by_saturated_fat": "2-3 squares (to stay within 20g daily saturated fat limit)",
      "recommended": "1-2 squares daily due to saturated fat content"
    }
  }
};