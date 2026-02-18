'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  labels?: string[];
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, labels, value, min = 0, max = 100, step = 1, ...props }, ref) => {
    const percentage = ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;

    return (
      <div className="w-full">
        <div className="relative">
          <input
            type="range"
            ref={ref}
            value={value}
            min={min}
            max={max}
            step={step}
            className={cn(
              'w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:w-5',
              '[&::-webkit-slider-thumb]:h-5',
              '[&::-webkit-slider-thumb]:rounded-full',
              '[&::-webkit-slider-thumb]:bg-primary',
              '[&::-webkit-slider-thumb]:shadow-glow-primary',
              '[&::-webkit-slider-thumb]:cursor-pointer',
              '[&::-webkit-slider-thumb]:transition-transform',
              '[&::-webkit-slider-thumb]:hover:scale-110',
              '[&::-moz-range-thumb]:w-5',
              '[&::-moz-range-thumb]:h-5',
              '[&::-moz-range-thumb]:rounded-full',
              '[&::-moz-range-thumb]:bg-primary',
              '[&::-moz-range-thumb]:border-0',
              '[&::-moz-range-thumb]:cursor-pointer',
              className
            )}
            style={{
              background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${percentage}%, #F1F5F9 ${percentage}%, #F1F5F9 100%)`,
            }}
            {...props}
          />
        </div>
        {labels && labels.length > 0 && (
          <div className="flex justify-between mt-2 text-xs text-muted">
            {labels.map((label, index) => (
              <span
                key={index}
                className={cn(
                  'transition-colors',
                  Math.round((index / (labels.length - 1)) * 100) <= percentage
                    ? 'text-primary font-medium'
                    : ''
                )}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);
Slider.displayName = 'Slider';

export { Slider };
