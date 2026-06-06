'use client';

import Link from 'next/link';
import { Icons } from '@/presentation/components/icons';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-secondary-bg flex flex-col items-center justify-center p-6 text-center space-y-8">
      <div className="relative">
        <h1 className="text-[120px] font-black text-tg-blue/5 leading-none select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-24 h-24 bg-tg-blue rounded-3xl flex items-center justify-center shadow-2xl shadow-tg-blue/30 transform -rotate-12">
             <span className="text-white text-5xl font-bold tracking-tighter italic">TB</span>
           </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-tg-text">صفحه مورد نظر پیدا نشد</h2>
        <p className="text-sm text-tg-hint max-w-[250px] mx-auto">
          متاسفانه صفحه‌ای که دنبالش بودید وجود ندارد یا آدرس آن تغییر کرده است.
        </p>
      </div>

      <Link
        href="/"
        className="bg-tg-blue text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-tg-blue/20 active:scale-95 transition-all"
      >
        <Icons.ChevronLeft className="rotate-180" size={20} />
        بازگشت به خانه
      </Link>
    </div>
  );
}
