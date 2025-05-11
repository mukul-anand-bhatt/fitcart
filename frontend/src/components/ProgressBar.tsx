import React from 'react';
import { getNutrientColor } from '../utils/healthAnalysis';

interface ProgressBarProps {
  percentage: number;
  height?: string;
  animate?: boolean;
  label?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  height = '0.5rem',
  animate = true,
  label,
  showPercentage = true,
}) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const color = getNutrientColor(clampedPercentage);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm">
          <span>{label}</span>
          {showPercentage && <span>{clampedPercentage}%</span>}
        </div>
      )}
      <div 
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className={`transition-all duration-1000 ease-out ${animate ? 'animate-grow' : ''}`}
          style={{ 
            width: animate ? '0%' : `${clampedPercentage}%`,
            height,
            backgroundColor: color,
          }}
        />
      </div>
      <style>
        {`
          @keyframes growWidth {
            to { width: ${clampedPercentage}%; }
          }
          .animate-grow {
            animation: growWidth 1.5s forwards ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default ProgressBar;