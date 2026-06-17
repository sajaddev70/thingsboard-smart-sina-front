'use client';

import { useRouter } from 'next/navigation';
import { Icons } from '@/presentation/components/icons';
import { motion } from 'framer-motion';

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-tg-secondary-bg flex flex-col h-full">
      <header className="p-4 bg-white dark:bg-[#1c1c1d] border-b dark:border-gray-800 flex items-center gap-4 sticky top-0 z-30">
        <button onClick={() => router.back()} className="text-tg-blue">
          <Icons.ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">{title}</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center opacity-60">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-gray-100 dark:bg-gray-800 text-tg-hint rounded-3xl flex items-center justify-center mb-4"
        >
          <Icons.Cpu size={32} />
        </motion.div>
        <h2 className="text-lg font-bold mb-2">در حال توسعه</h2>
        <p className="text-sm">این بخش به زودی پیاده‌سازی خواهد شد.</p>
      </main>
    </div>
  );
}
