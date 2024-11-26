import { renderHook } from '@testing-library/react';
import { toast, useToast } from '../use-toast';
import { act } from 'react';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

describe('useToast', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should add a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Test Toast' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Test Toast');
  });

  it('should dismiss a toast', () => {
    const { result } = renderHook(() => useToast());

    let toastId: string;

    act(() => {
      const newToast = toast({ title: 'Dismiss Test Toast' });
      toastId = newToast.id;
    });

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it('should remove a toast after the remove delay', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useToast());

    let toastId: string;

    act(() => {
      const newToast = toast({ title: 'Remove Test Toast' });
      toastId = newToast.id;
    });

    act(() => {
      result.current.dismiss(toastId);
    });

    act(() => {
      jest.advanceTimersByTime(TOAST_REMOVE_DELAY);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should update a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Initial Title' });
    });

    act(() => {
      toast({ title: 'Updated Title' });
    });

    expect(result.current.toasts[0].title).toBe('Updated Title');
  });

  it('should limit the number of toasts to TOAST_LIMIT', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      Array.from({ length: TOAST_LIMIT + 1 }).forEach((_, index) =>
        toast({ title: `Toast ${index + 1}` }),
      );
    });

    expect(result.current.toasts).toHaveLength(TOAST_LIMIT);
    expect(result.current.toasts[0].title).toBe(`Toast ${TOAST_LIMIT + 1}`);
  });
});
