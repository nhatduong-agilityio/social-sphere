'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useSetTheme = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted && theme === 'system' && resolvedTheme !== 'dark') {
      setTheme('dark');
    }
    setMounted(true);
  }, [mounted, theme, resolvedTheme, setTheme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    toggleTheme,
    mounted,
    isDarkTheme: theme === 'dark',
  };
};
