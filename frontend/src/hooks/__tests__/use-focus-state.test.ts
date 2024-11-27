import { renderHook, act } from '@testing-library/react';
import { useFocusState } from '../use-focus-state';

describe('useFocusState', () => {
  it('should initialize with isFocused as false', () => {
    const { result } = renderHook(() => useFocusState());
    expect(result.current.isFocused).toBe(false);
  });

  it('should set isFocused to true when handleFocus is called', () => {
    const { result } = renderHook(() => useFocusState());

    act(() => {
      result.current.handleFocus();
    });

    expect(result.current.isFocused).toBe(true);
  });

  it('should set isFocused to false when handleBlur is called', () => {
    const { result } = renderHook(() => useFocusState());

    act(() => {
      result.current.handleFocus();
      result.current.handleBlur();
    });

    expect(result.current.isFocused).toBe(false);
  });
});
