'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

interface RadioCardProps {
  id: string;
  label: string;
  description?: string;
  latexContent?: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  showCorrect?: boolean;
  isCorrect?: boolean;
}

export function RadioCard({
  label,
  description,
  latexContent,
  selected,
  onSelect,
  disabled,
  showCorrect,
  isCorrect,
}: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        disabled && 'cursor-not-allowed opacity-60',
        showCorrect && isCorrect
          ? 'border-success bg-success-soft'
          : selected
          ? 'border-primary bg-primary-soft shadow-glow-primary'
          : 'border-slate-200 bg-white hover:border-slate-300',
        showCorrect && selected && !isCorrect && 'border-danger bg-danger-soft'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
            showCorrect && isCorrect
              ? 'border-success bg-success'
              : selected
              ? 'border-primary bg-primary'
              : 'border-slate-300'
          )}
        >
          {(selected || (showCorrect && isCorrect)) && (
            <Check className="w-3 h-3 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-heading">{label}</span>
          </div>
          {description && (
            <p className="text-sm text-muted mt-1">{description}</p>
          )}
          {latexContent && (
            <div className="mt-2 text-base text-heading">
              {latexContent}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
