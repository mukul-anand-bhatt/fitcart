import React, { useEffect, useRef } from 'react';
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
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      if (animate) {
        progressRef.current.style.width = '0%';
        // Force reflow to ensure animation starts from 0
        progressRef.current.getBoundingClientRect();
        progressRef.current.style.width = `${clampedPercentage}%`;
      } else {
        progressRef.current.style.width = `${clampedPercentage}%`;
      }
    }
  }, [clampedPercentage, animate]);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm text-gray-800 dark:text-gray-200">
          <span>{label}</span>
          {showPercentage && <span>{clampedPercentage}%</span>}
        </div>
      )}
      <div 
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          ref={progressRef}
          className="transition-all duration-1000 ease-out"
          style={{ 
            height: '100%',
            backgroundColor: color,
            width: animate ? '0%' : `${clampedPercentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;