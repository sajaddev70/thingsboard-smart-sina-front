'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/presentation/components/Input';
import { Button } from '@/presentation/components/Button';
import { authService } from '@/application/auth/authService';
import { useAuthStore } from '@/application/auth/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'MOBILE' | 'OTP'>('MOBILE');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 11) {
        setError('شماره موبایل وارد شده صحیح نیست');
        return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await authService.sendOtp(mobile);
      if (response.isHasError) {
          setError(response.message || 'خطا در ارسال کد تایید');
      } else {
          setStep('OTP');
      }
    } catch (err) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : 'اختلال در برقراری ارتباط';
      setError(message || 'اختلال در برقراری ارتباط');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.verifyOtp(mobile, otp);
      if (response.isHasError || response.dataList.length === 0) {
        setError(response.message || 'کد تایید اشتباه است');
      } else {
        const { token, refreshToken } = response.dataList[0];
        localStorage.setItem('jwt_token', token);
        if (refreshToken) localStorage.setItem('refresh_token', refreshToken);

        const userResponse = await authService.getCurrentUser();
        const user = userResponse.dataList[0];

        useAuthStore.getState().setAuth(user, token, refreshToken || '');
        router.push('/');
      }
    } catch (err) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : 'کد وارد شده اشتباه است';
      setError(message || 'کد وارد شده اشتباه است');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-12 max-w-md mx-auto overflow-hidden">
      <motion.div
        layoutId="logo"
        className="w-24 h-24 bg-tg-blue rounded-[28px] flex items-center justify-center shadow-lg shadow-tg-blue/20"
      >
        <span className="text-white text-4xl font-bold tracking-tighter italic">TB</span>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 'MOBILE' ? (
          <motion.div
            key="mobile-step"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="w-full space-y-8"
          >
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">ورود به تگز‌برد</h1>
              <p className="text-tg-hint">شماره موبایل خود را برای دریافت کد تایید وارد کنید</p>
            </div>

            <form onSubmit={handleSendOtp} className="w-full space-y-4">
              <Input
                label="شماره موبایل"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="09123456789"
                required
                maxLength={11}
              />
              {error && <p className="text-xs text-red-500 px-1">{error}</p>}
              <Button type="submit" isLoading={isLoading} className="mt-4 py-4 rounded-2xl">
                ارسال کد تایید
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="otp-step"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="w-full space-y-8"
          >
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">کد تایید</h1>
              <p className="text-tg-hint leading-relaxed">
                کد ارسال شده به شماره <span className="text-tg-text font-bold tabular-nums" dir="ltr">{mobile}</span> را وارد کنید
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="w-full space-y-4">
              <div className="flex justify-center gap-2" dir="ltr">
                 <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="− − − −"
                    className="text-center text-2xl tracking-[12px] font-bold"
                    required
                    maxLength={4}
                    autoFocus
                 />
              </div>
              {error && <p className="text-xs text-red-500 text-center">{error}</p>}
              <Button type="submit" isLoading={isLoading} className="mt-4 py-4 rounded-2xl">
                تایید و ورود
              </Button>
              <button
                type="button"
                onClick={() => setStep('MOBILE')}
                className="w-full text-sm text-tg-blue font-medium py-2 active:opacity-60 transition-opacity"
              >
                تغییر شماره موبایل
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-[10px] text-tg-hint text-center max-w-[200px]">
        با ورود به برنامه، شما قوانین و مقررات تگز‌برد را می‌پذیرید.
      </div>
    </div>
  );
}
