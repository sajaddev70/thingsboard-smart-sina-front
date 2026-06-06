'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/infrastructure/api/client';
import { Icons } from '@/presentation/components/icons';
import { Skeleton } from '@/presentation/components/skeleton/Skeleton';
import { useRouter } from 'next/navigation';
import { Dashboard } from '@/domain/models/dashboard';

export default function DashboardsPage() {
  const router = useRouter();

  const { data: dashboards, isLoading } = useQuery<{ data: Dashboard[] }>({
    queryKey: ['dashboards'],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/tenant/dashboards?pageSize=20&page=0');
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-tg-secondary-bg">
      <header className="p-4 bg-white dark:bg-[#1c1c1d] border-b dark:border-gray-800 flex items-center gap-4 sticky top-0 z-30">
        <button onClick={() => router.back()} className="text-tg-blue">
          <Icons.ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">داشبوردها</h1>
      </header>

      <main className="p-4 grid grid-cols-1 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#1c1c1d] p-4 rounded-2xl space-y-3 border border-gray-100 dark:border-gray-800">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))
        ) : dashboards?.data?.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <Icons.Dashboard size={48} className="mx-auto mb-4" />
            <p>هیچ داشبوردی یافت نشد</p>
          </div>
        ) : (
          dashboards?.data?.map((dashboard) => (
            <button
              key={dashboard.id.id}
              className="w-full bg-white dark:bg-[#1c1c1d] p-0 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden active:scale-[0.98] transition-transform text-right group"
            >
              <div className="h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center relative">
                {dashboard.image ? (
                  <img src={dashboard.image} alt={dashboard.title} className="w-full h-full object-cover" />
                ) : (
                  <Icons.Dashboard size={40} className="text-tg-blue opacity-20" />
                )}
                <div className="absolute inset-0 bg-black/5 group-active:bg-black/10 transition-colors" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">{dashboard.title}</div>
                  <div className="text-[10px] text-tg-hint mt-1">تعداد ویجت‌ها: نامشخص</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-tg-blue/10 flex items-center justify-center text-tg-blue">
                  <Icons.ChevronLeft size={18} />
                </div>
              </div>
            </button>
          ))
        )}
      </main>
    </div>
  );
}
