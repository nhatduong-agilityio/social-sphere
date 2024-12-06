import { renderHook, act } from '@testing-library/react';
import { useCommentForm } from '../use-comment-form';

describe('useCommentForm', () => {
  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'mock-url');
    URL.revokeObjectURL = jest.fn();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useCommentForm());

    expect(result.current.form.getValues()).toEqual({
      content: '',
      tagFriends: [],
    });
    expect(result.current.selectedImageUrl).toBe('');
    expect(result.current.selectedTagFriends).toEqual([]);
  });

  it('handles file changes correctly', () => {
    const { result } = renderHook(() => useCommentForm());
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });

    act(() => {
      result.current.handleFileChange({
        target: { files: [mockFile] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.selectedImageUrl).toBe('mock-url');
    expect(result.current.form.getValues('media')).toBe(mockFile);
  });

  it('handles media removal correctly', () => {
    const { result } = renderHook(() => useCommentForm());

    act(() => {
      result.current.handleFileChange({
        target: { files: [new File(['test'], 'test.png')] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleRemoveMedia();
    });

    expect(result.current.selectedImageUrl).toBe('');
    expect(result.current.form.getValues('media')).toBeNull();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });

  it('handles tagging friends correctly', () => {
    const { result } = renderHook(() => useCommentForm());

    act(() => {
      result.current.handleTagFriends('friend1');
    });

    expect(result.current.selectedTagFriends).toEqual(['friend1']);
    expect(result.current.form.getValues('tagFriends')).toEqual(['friend1']);
  });

  it('handles removing individual friends correctly', () => {
    const { result } = renderHook(() => useCommentForm());

    act(() => {
      result.current.handleTagFriends('friend1');
      result.current.handleTagFriends('friend2');
      result.current.handleRemoveFriend('friend1');
    });

    expect(result.current.selectedTagFriends).toEqual(['friend2']);
    expect(result.current.form.getValues('tagFriends')).toEqual(['friend2']);
  });

  it('handles removing all friends with multiple tagged friends', () => {
    const { result } = renderHook(() => useCommentForm());

    act(() => {
      result.current.handleTagFriends('friend1');
      result.current.handleTagFriends('friend2');
      result.current.handleTagFriends('friend3');
    });

    expect(result.current.selectedTagFriends).toEqual([
      'friend1',
      'friend2',
      'friend3',
    ]);
    expect(result.current.form.getValues('tagFriends')).toEqual([
      'friend1',
      'friend2',
      'friend3',
    ]);

    act(() => {
      result.current.handleRemoveAllFriends();
    });

    expect(result.current.selectedTagFriends).toEqual([]);
    expect(result.current.form.getValues('tagFriends')).toEqual([]);
  });

  it('generates correct FormData', () => {
    const { result } = renderHook(() => useCommentForm());
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const mockValues = {
      content: 'test content',
      media: mockFile,
      tagFriends: ['friend1', 'friend2'],
    };

    const formData = result.current.getFormData(mockValues);

    expect(formData.get('content')).toBe('test content');
    expect(formData.get('media')).toBe(mockFile);
    expect(formData.getAll('tagFriends')).toEqual(['friend1', 'friend2']);
  });

  it('handles removing friend with filter correctly', () => {
    const { result } = renderHook(() => useCommentForm());

    act(() => {
      result.current.handleTagFriends('friend1');
      result.current.handleTagFriends('friend2');
      result.current.handleTagFriends('friend3');
    });
    expect(result.current.selectedTagFriends).toEqual([
      'friend1',
      'friend2',
      'friend3',
    ]);

    act(() => {
      result.current.handleRemoveFriend('friend2');
    });
    expect(result.current.selectedTagFriends).toEqual(['friend1', 'friend3']);
    expect(result.current.form.getValues('tagFriends')).toEqual([
      'friend1',
      'friend3',
    ]);
  });

  it('handles tag friends toggle correctly', () => {
    const { result } = renderHook(() => useCommentForm());

    act(() => {
      result.current.handleTagFriends('friend1');
    });
    expect(result.current.selectedTagFriends).toEqual(['friend1']);

    act(() => {
      result.current.handleTagFriends('friend1');
    });
    expect(result.current.selectedTagFriends).toEqual([]);
  });
});
