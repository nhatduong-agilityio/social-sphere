'use client';

// Components
import { MoonIcon, SunIcon } from 'lucide-react';
import { Switch } from '../ui';

// Hooks
import { useSetTheme } from '@/hooks';

export const SwitchTheme = () => {
  const { isDarkTheme, toggleTheme, mounted } = useSetTheme();

  return mounted ? (
    <Switch
      checked={isDarkTheme}
      onCheckedChange={toggleTheme}
      uncheckedIcon={<MoonIcon size={12} className="text-white" />}
      checkedIcon={<SunIcon size={12} className="text-yellow-400" />}
    />
  ) : null;
};
