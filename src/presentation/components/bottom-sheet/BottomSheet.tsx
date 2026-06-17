'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

export function BottomSheet({ isOpen, onClose, children, title, className }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1c1c1d] rounded-t-[20px] shadow-2xl safe-area-bottom max-h-[90vh] overflow-hidden flex flex-col",
              className
            )}
          >
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto my-3 shrink-0" />
            {title && (
              <div className="px-4 py-2 border-b dark:border-gray-800 text-center font-bold text-lg">
                {title}
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
