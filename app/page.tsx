'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/application/auth/useAuthStore';
import { Button } from '@/presentation/components/Button';
import { Icons } from '@/presentation/components/icons';
import { motion } from 'framer-motion';

export default function Home() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isMounted || !isAuthenticated) return null;

  const menuItems = [
    { label: 'دستگاه‌ها', icon: Icons.Device, color: 'text-blue-500', href: '/devices' },
    { label: 'هشدارها', icon: Icons.Alarm, color: 'text-red-500', href: '/alarms' },
    { label: 'دارایی‌ها', icon: Icons.Asset, color: 'text-green-500', href: '/assets' },
    { label: 'داشبوردها', icon: Icons.Dashboard, color: 'text-orange-500', href: '/dashboards' },
    { label: 'تاریخچه لاگ', icon: Icons.History, color: 'text-purple-500', href: '/admin/inspector' },
    { label: 'تنظیمات', icon: Icons.Settings, color: 'text-gray-500', href: '/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-tg-secondary-bg">
      <header className="p-4 bg-white dark:bg-[#1c1c1d] border-b dark:border-gray-800 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-tg-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user?.firstName?.[0] || 'U'}
          </div>
          <div>
            <h1 className="text-sm font-bold">{user?.name || 'کاربر'}</h1>
            <p className="text-[10px] text-tg-hint leading-tight">{user?.email}</p>
          </div>
        </div>
        <button onClick={() => logout()} className="p-2 text-tg-hint active:text-red-500 transition-colors">
          <Icons.Logout size={20} />
        </button>
      </header>

      <main className="p-4 space-y-6 pb-24">
        <section className="grid grid-cols-3 gap-3">
          {menuItems.map((item, idx) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => router.push(item.href)}
              className="bg-white dark:bg-[#1c1c1d] p-4 rounded-[20px] flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-all border border-gray-100 dark:border-gray-800"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center ${item.color}`}>
                <item.icon size={24} />
              </div>
              <span className="text-[11px] font-bold text-tg-text whitespace-nowrap">{item.label}</span>
            </motion.button>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-xs font-bold text-tg-hint uppercase px-1 tracking-wider">وضعیت سیستم</h2>
          <div className="bg-white dark:bg-[#1c1c1d] rounded-[20px] divide-y dark:divide-gray-800 shadow-sm border border-gray-100 dark:border-gray-800">
             <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-500/10 text-green-600 rounded-lg">
                    <Icons.Live size={18} />
                  </div>
                  <span className="text-sm font-medium">وضعیت اتصال</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-md">آنلاین</span>
             </div>
             <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-lg">
                    <Icons.Security size={18} />
                  </div>
                  <span className="text-sm font-medium">سطح دسترسی</span>
                </div>
                <span className="text-xs font-bold text-tg-hint">
                  {user?.authority === 'SYS_ADMIN' ? 'مدیر سیستم' :
                   user?.authority === 'TENANT_ADMIN' ? 'مدیر مستأجر' :
                   user?.authority === 'CUSTOMER_USER' ? 'کاربر مشتری' : user?.authority}
                </span>
             </div>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] bg-background/80 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 px-6 py-3 flex justify-between items-center z-40 safe-area-bottom">
         <button onClick={() => router.push('/')} className="text-tg-blue flex flex-col items-center gap-1">
            <Icons.Dashboard size={22} />
            <span className="text-[10px] font-bold">خانه</span>
         </button>
         <button onClick={() => router.push('/devices')} className="text-tg-hint flex flex-col items-center gap-1 active:text-tg-blue transition-colors">
            <Icons.Device size={22} />
            <span className="text-[10px] font-bold">دستگاه‌ها</span>
         </button>
         <button onClick={() => router.push('/alarms')} className="text-tg-hint flex flex-col items-center gap-1 active:text-tg-blue transition-colors">
            <Icons.Alarm size={22} />
            <span className="text-[10px] font-bold">هشدارها</span>
         </button>
         <button onClick={() => router.push('/settings')} className="text-tg-hint flex flex-col items-center gap-1 active:text-tg-blue transition-colors">
            <Icons.Settings size={22} />
            <span className="text-[10px] font-bold">تنظیمات</span>
         </button>
      </nav>
    </div>
  );
}
