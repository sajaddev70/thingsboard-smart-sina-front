'use client';

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export function OtpInput({ value, onChange, length = 4 }: OtpInputProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const items = Array.from({ length }).map((_, i) => value[i] || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const char = e.target.value.slice(-1);
    if (!/^\d*$/.test(char)) return;

    const newValue = value.split('');
    newValue[index] = char;
    const finalValue = newValue.join('').slice(0, length);
    onChange(finalValue);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !items[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-4 justify-center" dir="ltr">
      {items.map((char, i) => (
        <input
          key={i}
          ref={(el) => { if (el) inputRefs.current[i] = el; }}
          type="tel"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={char}
          onFocus={() => setFocusedIndex(i)}
          onBlur={() => setFocusedIndex(null)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={cn(
            "w-14 h-16 bg-secondary-bg border-2 border-transparent rounded-2xl text-center text-2xl font-bold transition-all outline-none",
            focusedIndex === i ? "border-tg-blue bg-background shadow-[0_0_0_4px_rgba(36,129,204,0.1)]" : "text-tg-text"
          )}
        />
      ))}
    </div>
  );
}
