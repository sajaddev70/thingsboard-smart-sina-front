'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-12 h-6 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-12 h-6 bg-gray-200 dark:bg-[#0e1621] rounded-full p-1 transition-colors border border-gray-300 dark:border-gray-700"
    >
      <div
        className={`w-4 h-4 bg-tg-blue rounded-full transition-transform ${
          theme === 'dark' ? '-translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
