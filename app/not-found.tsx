'use client';

import { useRouter } from 'next/navigation';
import { Icons } from '@/presentation/components/icons';
import { motion } from 'framer-motion';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-tg-secondary-bg flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-tg-blue/10 text-tg-blue rounded-3xl flex items-center justify-center mb-6"
      >
        <Icons.Info size={48} />
      </motion.div>

      <h1 className="text-2xl font-bold mb-2">صفحه مورد نظر یافت نشد</h1>
      <p className="text-tg-hint text-sm mb-8 leading-relaxed">
        متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است.
      </p>

      <button
        onClick={() => router.push('/')}
        className="bg-tg-blue text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-tg-blue/30 active:scale-95 transition-transform"
      >
        بازگشت به صفحه اصلی
      </button>

      <div className="mt-12 text-[10px] text-tg-hint opacity-50 uppercase tracking-widest font-mono">
        خطای ۴۰۴ • تینگزبرد هوشمند سینا
      </div>
    </div>
  );
}
