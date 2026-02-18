'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';

interface SegmentedControlProps {
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  return (
    <div
      className={cn(
        'inline-flex p-1 bg-slate-100 rounded-xl',
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
            value === option.value
              ? 'bg-white text-primary shadow-card'
              : 'text-muted hover:text-heading'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
