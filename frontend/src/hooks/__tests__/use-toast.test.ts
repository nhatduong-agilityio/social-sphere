import { renderHook, act } from '@testing-library/react';
import { useToast, toast } from '../use-toast';
import { ToastActionElement, ToastProps } from '@/components/ui/toast';

describe('useToast', () => {
  it('should add a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Test Toast' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Test Toast');
  });

  it('should update a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Updated Toast' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Updated Toast');
  });
  it('should dismiss a toast', () => {
    const { result } = renderHook(() => useToast());

    let toastId: string;
    act(() => {
      toastId = result.current.toast({ title: 'Test Toast' }).id;
    });

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it('should remove all toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Toast 1' });
      result.current.toast({ title: 'Toast 2' });
    });

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.toasts).toHaveLength(1);
  });

  it('should limit the number of toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      for (let i = 0; i < 5; i++) {
        result.current.toast({ title: `Toast ${i}` });
      }
    });

    expect(result.current.toasts).toHaveLength(1);
  });

  it('should remove a toast after dismiss', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Test Toast' });
    });

    act(() => {
      result.current.dismiss();
      jest.advanceTimersByTime(1000000);
    });

    expect(result.current.toasts).toHaveLength(0);
    jest.useRealTimers();
  });

  it('should dismiss toast when onOpenChange is called with false', () => {
    const { result } = renderHook(() => useToast());

    let toastId: string;
    act(() => {
      toastId = result.current.toast({ title: 'Test Toast' }).id;
    });

    act(() => {
      const toast = result.current.toasts.find((t) => t.id === toastId);
      if (toast && toast.onOpenChange) {
        toast.onOpenChange(false);
      }
    });

    expect(result.current.toasts).toHaveLength(1);
  });

  it('should update a toast using the update function', () => {
    const { result } = renderHook(() => useToast());

    let toastControls: {
      id: string;
      dismiss: () => void;
      update: (
        props: ToastProps & {
          id: string;
          title?: React.ReactNode;
          description?: React.ReactNode;
          action?: ToastActionElement;
        },
      ) => void;
    };
    act(() => {
      toastControls = result.current.toast({ title: 'Initial Toast' });
    });

    act(() => {
      toastControls.update({ id: '', title: 'Updated Toast' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Updated Toast');
  });

  it('should not add duplicate timeouts for the same toast', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useToast());

    let toastId: string;
    await act(async () => {
      toastId = result.current.toast({ title: 'Test Toast' }).id;
    });

    await act(async () => {
      result.current.dismiss(toastId);
      result.current.dismiss(toastId); // Attempt to dismiss the same toast twice
    });

    await act(async () => {
      jest.advanceTimersByTime(1000000);
    });

    expect(result.current.toasts).toHaveLength(0);

    jest.useRealTimers();
  });
});

describe('toast function', () => {
  it('should return toast controls', () => {
    const controls = toast({ title: 'Test Toast' });
    expect(controls).toHaveProperty('id');
    expect(controls).toHaveProperty('dismiss');
    expect(controls).toHaveProperty('update');
  });
});
