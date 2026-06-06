'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/infrastructure/api/client';
import { Icons } from '@/presentation/components/icons';
import { Skeleton } from '@/presentation/components/skeleton/Skeleton';
import { useRouter } from 'next/navigation';
import { Alarm, AlarmSeverity } from '@/domain/models/alarm';
import { cn } from '@/lib/utils';

const severityMap: Record<AlarmSeverity, { label: string; color: string; bg: string }> = {
  [AlarmSeverity.CRITICAL]: { label: 'بحرانی', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-500/10' },
  [AlarmSeverity.MAJOR]: { label: 'مهم', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-500/10' },
  [AlarmSeverity.MINOR]: { label: 'جزئی', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
  [AlarmSeverity.WARNING]: { label: 'هشدار', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  [AlarmSeverity.INDETERMINATE]: { label: 'نامشخص', color: 'text-gray-600', bg: 'bg-gray-50 dark:bg-gray-500/10' },
};

export default function AlarmsPage() {
  const router = useRouter();

  const { data: alarms, isLoading } = useQuery<{ data: Alarm[] }>({
    queryKey: ['alarms'],
    queryFn: async () => {
      // For general alarms, we use the tenant alarms endpoint
      const { data } = await apiClient.get('/api/alarms?pageSize=20&page=0&sortProperty=createdTime&sortOrder=DESC');
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-tg-secondary-bg">
      <header className="p-4 bg-white dark:bg-[#1c1c1d] border-b dark:border-gray-800 flex items-center gap-4 sticky top-0 z-30">
        <button onClick={() => router.back()} className="text-tg-blue">
          <Icons.ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">هشدارها</h1>
      </header>

      <main className="p-4 space-y-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#1c1c1d] p-4 rounded-2xl space-y-2 border border-gray-100 dark:border-gray-800">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))
        ) : alarms?.data?.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <Icons.BellOff size={48} className="mx-auto mb-4" />
            <p>هیچ هشداری یافت نشد</p>
          </div>
        ) : (
          alarms?.data?.map((alarm) => {
            const severity = severityMap[alarm.severity] || severityMap[AlarmSeverity.INDETERMINATE];
            return (
              <div
                key={alarm.id.id}
                className="w-full bg-white dark:bg-[#1c1c1d] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full animate-pulse", severity.color.replace('text', 'bg'))} />
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", severity.bg, severity.color)}>
                      {severity.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-tg-hint" dir="ltr">
                    {new Date(alarm.createdTime).toLocaleTimeString('fa-IR')}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-sm">{alarm.type}</div>
                  <div className="text-xs text-tg-hint mt-1 flex items-center gap-1">
                    <Icons.Device size={12} />
                    {alarm.originatorName || 'دستگاه ناشناس'}
                  </div>
                </div>

                <div className="pt-2 border-t dark:border-gray-800 flex justify-end gap-2">
                  <button className="text-[10px] font-bold text-tg-blue px-3 py-1.5 rounded-lg active:bg-blue-50 dark:active:bg-blue-500/10 transition-colors">
                    مشاهده جزئیات
                  </button>
                  {alarm.status.includes('UNACK') && (
                    <button className="text-[10px] font-bold bg-tg-blue text-white px-3 py-1.5 rounded-lg active:opacity-80 transition-opacity">
                      تایید (Ack)
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
