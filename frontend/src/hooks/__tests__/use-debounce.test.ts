// useDebounce.test.tsx

import { act, renderHook } from '@testing-library/react';
import { useDebounce } from '../use-debounce';

describe('useDebounce hook', () => {
  jest.useFakeTimers();

  it('should return the same value initially', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should update the debounced value after the specified delay', () => {
    const { result } = renderHook(() => useDebounce('test', 500));

    expect(result.current).toBe('test');

    act(() => {
      result.current = 'changed';
    });

    expect(result.current).toBe('changed');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('changed');
  });

  it('should clear the timeout if value changes before the delay', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));

    act(() => {
      result.current = 'first';
    });
    act(() => {
      result.current = 'second';
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('second');
  });

  it('should return the initial value if the delay is 0', () => {
    const { result } = renderHook(() => useDebounce('initial', 0));
    expect(result.current).toBe('initial');
  });

  it('should return the correct debounced value when delay is different', () => {
    const { result } = renderHook(() => useDebounce('test', 1000));

    expect(result.current).toBe('test');

    act(() => {
      result.current = 'changed';
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('changed');
  });
});
