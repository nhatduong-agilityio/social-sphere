import { renderHook, act } from '@testing-library/react';
import { useComposeDisclosure } from '../use-compose-disclosure';

describe('useComposeDisclosure', () => {
  it('initializes with all disclosures closed', () => {
    const { result } = renderHook(() => useComposeDisclosure());

    expect(result.current.gifPicker.isOpen).toBe(false);
    expect(result.current.tagFriends.isOpen).toBe(false);
    expect(result.current.moods.isOpen).toBe(false);
    expect(result.current.shareLink.isOpen).toBe(false);
    expect(result.current.location.isOpen).toBe(false);
  });

  it('opens gif picker and closes others', () => {
    const { result } = renderHook(() => useComposeDisclosure());

    act(() => {
      result.current.onOpenGifPicker();
    });

    expect(result.current.gifPicker.isOpen).toBe(true);
    expect(result.current.tagFriends.isOpen).toBe(false);
    expect(result.current.moods.isOpen).toBe(false);
    expect(result.current.shareLink.isOpen).toBe(false);
    expect(result.current.location.isOpen).toBe(false);
  });

  it('opens tag friends and closes others', () => {
    const { result } = renderHook(() => useComposeDisclosure());

    act(() => {
      result.current.onOpenTagFriends();
    });

    expect(result.current.gifPicker.isOpen).toBe(false);
    expect(result.current.tagFriends.isOpen).toBe(true);
    expect(result.current.moods.isOpen).toBe(false);
    expect(result.current.shareLink.isOpen).toBe(false);
    expect(result.current.location.isOpen).toBe(false);
  });

  it('opens moods and closes others', () => {
    const { result } = renderHook(() => useComposeDisclosure());

    act(() => {
      result.current.onOpenMoods();
    });

    expect(result.current.gifPicker.isOpen).toBe(false);
    expect(result.current.tagFriends.isOpen).toBe(false);
    expect(result.current.moods.isOpen).toBe(true);
    expect(result.current.shareLink.isOpen).toBe(false);
    expect(result.current.location.isOpen).toBe(false);
  });

  it('opens share link and closes others', () => {
    const { result } = renderHook(() => useComposeDisclosure());

    act(() => {
      result.current.onOpenShareLink();
    });

    expect(result.current.gifPicker.isOpen).toBe(false);
    expect(result.current.tagFriends.isOpen).toBe(false);
    expect(result.current.moods.isOpen).toBe(false);
    expect(result.current.shareLink.isOpen).toBe(true);
    expect(result.current.location.isOpen).toBe(false);
  });

  it('opens location and closes others', () => {
    const { result } = renderHook(() => useComposeDisclosure());

    act(() => {
      result.current.onOpenLocation();
    });

    expect(result.current.gifPicker.isOpen).toBe(false);
    expect(result.current.tagFriends.isOpen).toBe(false);
    expect(result.current.moods.isOpen).toBe(false);
    expect(result.current.shareLink.isOpen).toBe(false);
    expect(result.current.location.isOpen).toBe(true);
  });
});
