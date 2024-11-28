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
      title="switch-theme"
      data-testid="theme-switch"
      checked={isDarkTheme}
      onCheckedChange={toggleTheme}
      uncheckedIcon={
        <MoonIcon data-testid="moon-icon" size={12} className="text-white" />
      }
      checkedIcon={
        <SunIcon data-testid="sun-icon" size={12} className="text-yellow-400" />
      }
    />
  ) : null;
};
