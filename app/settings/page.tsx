'use client';

import { useRouter } from 'next/navigation';
import { Icons } from '@/presentation/components/icons';
import { useAuthStore } from '@/application/auth/useAuthStore';
import { ThemeToggle } from '@/presentation/components/ThemeToggle';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-tg-secondary-bg">
      <header className="p-4 bg-white dark:bg-[#1c1c1d] border-b dark:border-gray-800 flex items-center gap-4 sticky top-0 z-30">
        <h1 className="text-lg font-bold">تنظیمات</h1>
      </header>

      <main className="p-4 space-y-6">
        <section className="bg-white dark:bg-[#1c1c1d] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="p-4 flex items-center gap-4 border-b dark:border-gray-800">
             <div className="w-14 h-14 bg-tg-blue rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {user?.firstName?.[0] || 'U'}
             </div>
             <div>
                <div className="font-bold">{user?.name || 'کاربر تگزبرد'}</div>
                <div className="text-xs text-tg-hint">{user?.email}</div>
             </div>
          </div>
          <button className="w-full p-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-800 transition-colors">
             <div className="flex items-center gap-3">
                <Icons.User size={20} className="text-tg-hint" />
                <span className="text-sm font-medium">ویرایش پروفایل</span>
             </div>
             <Icons.ChevronLeft size={16} className="text-tg-hint opacity-30" />
          </button>
        </section>

        <section className="bg-white dark:bg-[#1c1c1d] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="p-4 flex items-center justify-between border-b dark:border-gray-800">
             <div className="flex items-center gap-3">
                <Icons.Live size={20} className="text-tg-hint" />
                <span className="text-sm font-medium">حالت شب</span>
             </div>
             <ThemeToggle />
          </div>
          <button
            onClick={() => router.push('/admin/inspector')}
            className="w-full p-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
          >
             <div className="flex items-center gap-3">
                <Icons.History size={20} className="text-tg-hint" />
                <span className="text-sm font-medium">تحلیل‌گر شبکه</span>
             </div>
             <Icons.ChevronLeft size={16} className="text-tg-hint opacity-30" />
          </button>
        </section>

        <button
          onClick={() => logout()}
          className="w-full bg-white dark:bg-[#1c1c1d] p-4 rounded-2xl flex items-center gap-3 text-red-500 font-bold border border-gray-100 dark:border-gray-800 shadow-sm active:bg-red-50 dark:active:bg-red-500/10 transition-colors"
        >
          <Icons.Logout size={20} />
          <span className="text-sm">خروج از حساب کاربری</span>
        </button>
      </main>
    </div>
  );
}
