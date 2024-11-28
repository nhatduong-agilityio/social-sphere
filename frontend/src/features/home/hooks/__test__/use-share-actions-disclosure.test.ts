import { renderHook, act } from '@testing-library/react';
import { useShareActionsDisclosure } from '../use-share-actions-disclosure';

describe('useShareActionsDisclosure', () => {
  it('initializes with all disclosures closed', () => {
    const { result } = renderHook(() => useShareActionsDisclosure());

    expect(result.current.tagFriends.isOpen).toBe(false);
    expect(result.current.location.isOpen).toBe(false);
  });

  it('toggles tag friends and closes location', () => {
    const { result } = renderHook(() => useShareActionsDisclosure());

    act(() => {
      result.current.onOpenTagFriends();
    });

    expect(result.current.tagFriends.isOpen).toBe(true);
    expect(result.current.location.isOpen).toBe(false);

    // Test toggle behavior
    act(() => {
      result.current.onOpenTagFriends();
    });

    expect(result.current.tagFriends.isOpen).toBe(false);
    expect(result.current.location.isOpen).toBe(false);
  });

  it('toggles location and closes tag friends', () => {
    const { result } = renderHook(() => useShareActionsDisclosure());

    act(() => {
      result.current.onOpenLocation();
    });

    expect(result.current.tagFriends.isOpen).toBe(false);
    expect(result.current.location.isOpen).toBe(true);

    // Test toggle behavior
    act(() => {
      result.current.onOpenLocation();
    });

    expect(result.current.tagFriends.isOpen).toBe(false);
    expect(result.current.location.isOpen).toBe(false);
  });
});
