import { renderHook } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { useSetTheme } from '../theme';
import { act } from 'react';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('useSetTheme', () => {
  it('should initialize and set theme to dark if system theme is not dark', () => {
    const mockSetTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'system',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    });

    renderHook(() => useSetTheme());

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should toggle theme between dark and light', () => {
    const mockSetTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    });

    const { result } = renderHook(() => useSetTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(mockSetTheme).toHaveBeenCalledWith('light');

    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should correctly report mounted state and theme status', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: jest.fn(),
      resolvedTheme: 'dark',
    });

    const { result } = renderHook(() => useSetTheme());

    expect(result.current.mounted).toBe(true);
    expect(result.current.isDarkTheme).toBe(true);
  });
});
