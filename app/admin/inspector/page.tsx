'use client';

import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ApiLog } from '@prisma/client';

export default function NetworkInspector() {
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const { data: logs, isLoading, error: queryError } = useQuery<ApiLog[]>({
    queryKey: ['api-logs'],
    queryFn: async () => {
      const res = await fetch('/api/logs/list?limit=100');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'خطای سرور');
      return data;
    },
    refetchInterval: 3000,
    retry: 1,
  });

  return (
    <div className="flex flex-col h-screen bg-tg-secondary-bg overflow-hidden">
      <header className="p-4 bg-white dark:bg-[#1c1c1d] border-b dark:border-gray-800 shrink-0">
        <h1 className="text-lg font-bold">تحلیل‌گر شبکه</h1>
        <p className="text-xs text-tg-hint">مانیتورینگ آنی APIها</p>
      </header>

      <div className="p-2 bg-white dark:bg-[#1c1c1d] border-b dark:border-gray-800 flex gap-2">
        <input
          type="text"
          placeholder="جستجوی اندپوینت یا بادی..."
          className="flex-1 bg-tg-secondary-bg rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-1 ring-tg-blue"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          className="bg-tg-secondary-bg rounded-lg px-2 py-1.5 text-xs outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">وضعیت</option>
          <option value="200">2xx</option>
          <option value="400">4xx</option>
          <option value="500">5xx</option>
        </select>
        <select
          className="bg-tg-secondary-bg rounded-lg px-2 py-1.5 text-xs outline-none"
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
        >
          <option value="all">متد</option>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-10 text-center text-tg-hint font-medium animate-pulse">در حال بارگذاری لاگ‌ها...</div>
        ) : queryError ? (
          <div className="p-10 text-center space-y-3">
             <div className="text-red-500 font-bold">{(queryError as Error).message}</div>
             <p className="text-[10px] text-tg-hint leading-relaxed max-w-[250px] mx-auto">
                این ویژگی نیاز به اتصال فعال به دیتابیس PostgreSQL دارد. لطفا تنظیمات DATABASE_URL را در فایل .env بررسی کنید.
             </p>
          </div>
        ) : !Array.isArray(logs) || logs.length === 0 ? (
          <div className="p-20 text-center text-tg-hint font-medium">
             هیچ لاگی یافت نشد
          </div>
        ) : (
          <div className="divide-y dark:divide-gray-800">
            {logs
              .filter((log) => {
                const matchesSearch = filter === '' ||
                  log.endpoint.toLowerCase().includes(filter.toLowerCase()) ||
                  JSON.stringify(log.requestBody).toLowerCase().includes(filter.toLowerCase()) ||
                  JSON.stringify(log.responseBody).toLowerCase().includes(filter.toLowerCase());

                const matchesStatus = statusFilter === 'all' ||
                  (statusFilter === '200' && log.status >= 200 && log.status < 300) ||
                  (statusFilter === '400' && log.status >= 400 && log.status < 500) ||
                  (statusFilter === '500' && log.status >= 500);

                const matchesMethod = methodFilter === 'all' || log.method === methodFilter;

                return matchesSearch && matchesStatus && matchesMethod;
              })
              .map((log) => (
              <button
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className="w-full p-4 bg-white dark:bg-[#1c1c1d] flex items-center gap-4 active:bg-gray-50 dark:active:bg-gray-800 transition-colors text-right"
              >
                <div className={cn(
                  "w-12 h-6 rounded-md text-[10px] font-bold flex items-center justify-center shrink-0",
                  log.status >= 200 && log.status < 300 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {log.status}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">{log.method}</span>
                    <span className="truncate text-xs text-tg-hint">{log.endpoint}</span>
                  </div>
                  <div className="text-[10px] text-tg-hint mt-1">
                    {new Date(log.timestamp).toLocaleTimeString('fa-IR')} • {log.duration} میلی‌ثانیه
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedLog && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed inset-0 z-50 bg-white dark:bg-[#1c1c1d] flex flex-col"
          >
            <header className="p-4 border-b dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-[#1c1c1d] z-10">
              <span className="font-bold">جزئیات درخواست</span>
              <button onClick={() => setSelectedLog(null)} className="text-tg-blue font-medium">بستن</button>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-6 text-left" dir="ltr">
              <div className="text-right" dir="rtl">
                <h3 className="text-xs font-bold text-tg-hint mb-2">دستور cURL</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg text-[10px] break-all font-mono whitespace-pre-wrap text-left" dir="ltr">
                  {selectedLog.curl}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-right" dir="rtl">
                <div>
                  <h3 className="text-xs font-bold text-tg-hint mb-1">روش (Method)</h3>
                  <div className="font-mono text-sm">{selectedLog.method}</div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-tg-hint mb-1">کد وضعیت (Status)</h3>
                  <div className="font-mono text-sm">{selectedLog.status}</div>
                </div>
              </div>

              <div className="text-right" dir="rtl">
                <h3 className="text-xs font-bold text-tg-hint mb-2">محتوای پاسخ (Response)</h3>
                <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg text-[10px] overflow-x-auto font-mono text-left" dir="ltr">
                  {JSON.stringify(selectedLog.responseBody, null, 2)}
                </pre>
              </div>

              <div className="text-right" dir="rtl">
                <h3 className="text-xs font-bold text-tg-hint mb-2">هدرها (Headers)</h3>
                <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg text-[10px] overflow-x-auto font-mono text-left" dir="ltr">
                  {JSON.stringify(selectedLog.headers, null, 2)}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
