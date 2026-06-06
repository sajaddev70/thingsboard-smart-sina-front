'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/infrastructure/api/client';
import { Icons } from '@/presentation/components/icons';
import { Skeleton } from '@/presentation/components/skeleton/Skeleton';
import { useRouter } from 'next/navigation';
import { Device } from '@/domain/models/device';
import { cn } from '@/lib/utils';

export default function DevicesPage() {
  const router = useRouter();

  const { data: devices, isLoading } = useQuery<{ data: Device[] }>({
    queryKey: ['tenant-devices'],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/tenant/deviceInfos?pageSize=20&page=0');
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-tg-secondary-bg">
      <header className="p-4 bg-white dark:bg-[#1c1c1d] border-b dark:border-gray-800 flex items-center gap-4 sticky top-0 z-30">
        <button onClick={() => router.back()} className="text-tg-blue">
          <Icons.ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">دستگاه‌ها</h1>
      </header>

      <main className="p-4 space-y-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#1c1c1d] p-4 rounded-2xl space-y-2 border border-gray-100 dark:border-gray-800">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))
        ) : (
          devices?.data?.map((device) => (
            <button
              key={device.id.id}
              className="w-full bg-white dark:bg-[#1c1c1d] p-4 rounded-2xl text-right flex items-center justify-between border border-gray-100 dark:border-gray-800 active:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                  <Icons.Device size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm">{device.name}</div>
                  <div className="text-[10px] text-tg-hint">{device.type}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold",
                  device.active ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500" : "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-500"
                )}>
                  {device.active ? 'فعال' : 'غیرفعال'}
                </span>
                <Icons.ChevronLeft size={16} className="text-tg-hint opacity-30" />
              </div>
            </button>
          ))
        )}
      </main>
    </div>
  );
}
