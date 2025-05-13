import React, { useState, useEffect } from "react";
import { NutritionalValue } from "../types";
// import { HealthAnalysis } from "../types";
import {
  calculatePercentage,
  dailyRecommendedValues,
  getNutrientValue,
} from "../utils/healthAnalysis";
import ProgressBar from "./ProgressBar";

interface NutritionFactsProps {
  per100g: NutritionalValue;
  perServing: NutritionalValue;
  servingSize: string;
  maxDailyConsumption?: {
    by_calories?: string;
    by_sugar?: string;
    by_sodium?: string;
    by_saturated_fat?: string;
    recommended?: string;
  };
}

const NutritionFacts: React.FC<NutritionFactsProps> = ({
  per100g,
  perServing,
  servingSize,
  maxDailyConsumption,
}) => {
  const [viewMode, setViewMode] = useState<"100g" | "serving">("serving");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const currentValues = viewMode === "100g" ? per100g : perServing;

  const getEnergyKcal = (): number => {
    return (
      currentValues.energy_kcal ||
      (currentValues.energy ? currentValues.energy : 0)
    );
  };

  const getNutrientPercentage = (
    nutrient: string,
    dailyValue: number
  ): number => {
    const value = getNutrientValue(currentValues, nutrient);
    return calculatePercentage(value, dailyValue);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Nutrition Facts
        </h3>
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
          <button
            className={`px-3 py-1 text-sm transition-colors ${
              viewMode === "serving"
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setViewMode("serving")}
          >
            Per Serving
          </button>
          <button
            className={`px-3 py-1 text-sm transition-colors ${
              viewMode === "100g"
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setViewMode("100g")}
          >
            Per 100g
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {viewMode === "serving"
          ? `Values per serving (${servingSize})`
          : "Values per 100g"}
      </p>

      <div className="space-y-4">
        <div className="flex justify-between border-b dark:border-gray-700 pb-2">
          <span className="font-medium dark:text-gray-200">Calories</span>
          <span className="dark:text-gray-300">{getEnergyKcal()} kcal</span>
        </div>

        <div className="space-y-3 ">
          <div>
            <ProgressBar
              percentage={getNutrientPercentage(
                "protein",
                dailyRecommendedValues.protein
              )}
              label="Protein"
              animate={animate}
            />
          </div>

          <div>
            <ProgressBar
              percentage={getNutrientPercentage(
                "carbohydrate",
                dailyRecommendedValues.carbs
              )}
              label="Carbohydrates"
              animate={animate}
            />
          </div>

          <div>
            <ProgressBar
              percentage={getNutrientPercentage(
                "total_sugars",
                dailyRecommendedValues.sugar
              )}
              label="Sugars"
              animate={animate}
            />
          </div>

          <div>
            <ProgressBar
              percentage={getNutrientPercentage(
                "total_fat",
                dailyRecommendedValues.totalFat
              )}
              label="Total Fat"
              animate={animate}
            />
          </div>

          <div>
            <ProgressBar
              percentage={getNutrientPercentage(
                "saturated_fat",
                dailyRecommendedValues.saturatedFat
              )}
              label="Saturated Fat"
              animate={animate}
            />
          </div>

          <div>
            <ProgressBar
              percentage={getNutrientPercentage(
                "sodium",
                dailyRecommendedValues.sodium
              )}
              label="Sodium"
              animate={animate}
            />
          </div>

          {(currentValues.cholesterol || currentValues.cholesterol_mg) && (
            <div>
              <ProgressBar
                percentage={getNutrientPercentage(
                  "cholesterol",
                  dailyRecommendedValues.cholesterol
                )}
                label="Cholesterol"
                animate={animate}
              />
            </div>
          )}
        </div>

        {/* Vitamins & Minerals */}
        <div className="pt-3 border-t dark:border-gray-700">
          <h4 className="text-sm font-medium mb-2 dark:text-gray-200">
            Vitamins & Minerals
          </h4>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {typeof currentValues.vitamins === "object" &&
            currentValues.vitamins !== null ? (
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(currentValues.vitamins).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace("_", " ")}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Vitamins: {currentValues.vitamins || "Not Specified"}</p>
            )}

            {typeof currentValues.minerals === "object" &&
            currentValues.minerals !== null ? (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(currentValues.minerals).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace("_", " ")}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-1">
                Minerals: {currentValues.minerals || "Not Specified"}
              </p>
            )}
          </div>
        </div>

        {/* Recommended Daily Consumption */}
        {/* {maxDailyConsumption && (
          <div className="pt-3 border-t dark:border-gray-700">
            <h4 className="text-sm font-medium mb-2 dark:text-gray-200">
              Recommended Daily Consumption
            </h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {maxDailyConsumption.recommended && (
                <p className="font-medium text-blue-600 dark:text-blue-400">
                  {maxDailyConsumption.recommended}
                </p>
              )}
              <div className="grid grid-cols-1 gap-2">
                {maxDailyConsumption.by_calories && (
                  <div className="flex items-center gap-2">
                    <span>By Calories:</span>
                    <span>{maxDailyConsumption.by_calories}</span>
                  </div>
                )}
                {maxDailyConsumption.by_sugar && (
                  <div className="flex items-center gap-2">
                    <span>By Sugar:</span>
                    <span>{maxDailyConsumption.by_sugar}</span>
                  </div>
                )}
                {maxDailyConsumption.by_saturated_fat && (
                  <div className="flex items-center gap-2">
                    <span>By Saturated Fat:</span>
                    <span>{maxDailyConsumption.by_saturated_fat}</span>
                  </div>
                )}
                {maxDailyConsumption.by_sodium && (
                  <div className="flex items-center gap-2">
                    <span>By Sodium:</span>
                    <span>{maxDailyConsumption.by_sodium}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )} */}

        {maxDailyConsumption && (
          <div className="pt-3 border-t dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recommended Daily Consumption
            </h4>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md p-3">
              {maxDailyConsumption.recommended && (
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                  {maxDailyConsumption.recommended}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                {maxDailyConsumption.by_calories && (
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-1.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>By Calories: {maxDailyConsumption.by_calories}</span>
                  </div>
                )}
                {maxDailyConsumption.by_sugar && (
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-1.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>By Sugar: {maxDailyConsumption.by_sugar}</span>
                  </div>
                )}
                {maxDailyConsumption.by_saturated_fat && (
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-1.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>
                      By Saturated Fat: {maxDailyConsumption.by_saturated_fat}
                    </span>
                  </div>
                )}
                {maxDailyConsumption.by_sodium && (
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-1.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>By Sodium: {maxDailyConsumption.by_sodium}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionFacts;
