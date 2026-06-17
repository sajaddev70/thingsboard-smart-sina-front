'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-tg-blue text-white active:bg-tg-blue-dark',
      secondary: 'bg-tg-secondary-bg text-tg-blue active:bg-gray-200 dark:active:bg-gray-700',
      ghost: 'bg-transparent text-tg-blue active:bg-tg-blue/10',
      danger: 'bg-red-500 text-white active:bg-red-600',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        className={cn(
          'w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
