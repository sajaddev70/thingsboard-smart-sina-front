'use client';

import { useRouter } from 'next/navigation';
import { Icons } from '@/presentation/components/icons';

export default function PlaceholderPage({ title = 'صفحه در حال ساخت' }: { title?: string }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-secondary-bg flex flex-col">
      <header className="p-4 bg-background border-b border-gray-100 dark:border-gray-800 flex items-center gap-4 sticky top-0 z-30">
        <button onClick={() => router.back()} className="text-tg-blue">
          <Icons.ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">{title}</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-20 h-20 bg-tg-blue/10 text-tg-blue rounded-full flex items-center justify-center">
          <Icons.Settings size={40} className="animate-spin-slow" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold">این صفحه به زودی آماده می‌شود</h2>
          <p className="text-sm text-tg-hint">در حال پیاده‌سازی جزئیات این بخش هستیم</p>
        </div>
        <button
          onClick={() => router.push('/')}
          className="bg-tg-blue text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-tg-blue/20"
        >
          بازگشت به خانه
        </button>
      </main>
    </div>
  );
}
