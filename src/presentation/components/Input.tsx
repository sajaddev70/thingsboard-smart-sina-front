'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-tg-hint px-1">
            {label}
          </label>
        )}
        <div className={cn(
          "relative flex items-center bg-tg-secondary-bg rounded-xl border border-transparent focus-within:border-tg-blue transition-all",
          error && "border-red-500 focus-within:border-red-500",
          className
        )}>
          <input
            ref={ref}
            className="w-full px-4 py-3 bg-transparent outline-none text-tg-text placeholder:text-tg-hint"
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-500 px-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
