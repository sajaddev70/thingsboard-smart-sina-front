'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Icons } from '@/presentation/components/icons';
import { cn } from '@/lib/utils';

export function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { label: 'خانه', icon: Icons.Home, href: '/' },
    { label: 'دستگاه‌ها', icon: Icons.Device, href: '/devices' },
    { label: 'هشدارها', icon: Icons.Alarms, href: '/alarms' },
    { label: 'تنظیمات', icon: Icons.Settings, href: '/settings' },
  ];

  // Hide nav on login page
  if (pathname === '/login') return null;

  return (
    <nav className="fixed bottom-0 w-full max-w-[600px] bg-background/80 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 px-6 py-3 flex justify-between items-center z-40 safe-area-bottom shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all active:scale-90",
              isActive ? "text-tg-blue" : "text-tg-hint hover:text-tg-blue"
            )}
          >
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className={cn("text-[10px] transition-all", isActive ? "font-black" : "font-bold")}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
