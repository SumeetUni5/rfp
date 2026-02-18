'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Layout({ children, className, fullWidth }: LayoutProps) {
  return (
    <div className={cn('min-h-screen bg-body', className)}>
      <div
        className={cn(
          'mx-auto',
          fullWidth ? 'w-full' : 'max-w-7xl px-4 sm:px-6 lg:px-8 py-8'
        )}
      >
        {children}
      </div>
    </div>
  );
}
