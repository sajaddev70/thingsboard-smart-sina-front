'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/presentation/components/Input';
import { Button } from '@/presentation/components/Button';
import { authService } from '@/application/auth/authService';
import { useAuthStore } from '@/application/auth/useAuthStore';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const tokens = await authService.login({ username, password });
      // Set token temporarily to fetch user
      localStorage.setItem('jwt_token', tokens.token);
      const user = await authService.getCurrentUser();

      setAuth(user, tokens.token, tokens.refreshToken);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'ورود ناموفق بود. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8 max-w-md mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-tg-blue rounded-3xl flex items-center justify-center shadow-lg"
      >
        <span className="text-white text-4xl font-bold">TB</span>
      </motion.div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">تگز‌برد</h1>
        <p className="text-tg-hint">برای ورود نام کاربری و رمز عبور خود را وارد کنید</p>
      </div>

      <form onSubmit={handleLogin} className="w-full space-y-4">
        <Input
          label="نام کاربری"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="example@thingsboard.org"
          required
        />
        <Input
          label="رمز عبور"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          error={error}
        />
        <Button type="submit" isLoading={isLoading} className="mt-4">
          ورود
        </Button>
      </form>

      <div className="text-sm text-tg-hint text-center">
        فراموشی رمز عبور؟
      </div>
    </div>
  );
}
