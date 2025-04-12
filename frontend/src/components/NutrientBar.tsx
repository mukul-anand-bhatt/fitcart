import React from 'react';

interface NutrientBarProps {
  label: string;
  value: number;
  maxValue: number;
  unit: string;
}

export const NutrientBar: React.FC<NutrientBarProps> = ({ label, value, maxValue, unit }) => {
  const percentage = (value / maxValue) * 100;
  
  const getColorClass = () => {
    if (percentage > 50) return 'bg-red-500';
    if (percentage > 20) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTextColorClass = () => {
    if (percentage > 50) return 'text-red-700';
    if (percentage > 20) return 'text-yellow-700';
    return 'text-green-700';
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-sm font-medium ${getTextColorClass()}`}>
          {value}{unit} ({percentage.toFixed(1)}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getColorClass()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};