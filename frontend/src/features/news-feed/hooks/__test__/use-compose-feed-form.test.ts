import { renderHook, act } from '@testing-library/react';
import { useComposeFeedForm } from '../use-compose-feed-form';

describe('useComposeFeedForm', () => {
  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'mock-url');
    URL.revokeObjectURL = jest.fn();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useComposeFeedForm());

    expect(result.current.form.getValues()).toEqual({
      content: '',
      accessItems: ['activityFeed'],
      activityRole: 'friends',
      storyRole: 'friends',
      gifUrl: '',
      tagFriends: [],
      mood: { title: '', content: '' },
      sharedLink: '',
      location: '',
      sendFriends: [],
    });
  });

  it('handles file changes correctly', () => {
    const { result } = renderHook(() => useComposeFeedForm());
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
    const { result } = renderHook(() => useComposeFeedForm());

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

  it('handles GIF selection and removal', () => {
    const { result } = renderHook(() => useComposeFeedForm());
    const gifUrl = 'https://example.com/gif.gif';

    act(() => {
      result.current.handleGifSelect(gifUrl);
    });

    expect(result.current.selectedGifUrl).toBe(gifUrl);
    expect(result.current.form.getValues('gifUrl')).toBe(gifUrl);

    act(() => {
      result.current.handleRemoveGif();
    });

    expect(result.current.selectedGifUrl).toBe('');
  });

  it('handles mood selection and removal', () => {
    const { result } = renderHook(() => useComposeFeedForm());
    const mood = { title: 'Happy', content: '😊' };

    act(() => {
      result.current.handleSelectMood(mood);
    });

    expect(result.current.selectedMood).toEqual(mood);
    expect(result.current.form.getValues('mood')).toEqual(mood);

    act(() => {
      result.current.handleRemoveMood();
    });

    expect(result.current.selectedMood).toEqual({ title: '', content: '' });
    expect(result.current.form.getValues('mood')).toEqual({
      title: '',
      content: '',
    });
  });

  it('handles tag friends operations', () => {
    const { result } = renderHook(() => useComposeFeedForm());

    act(() => {
      result.current.handleTagFriends('friend1');
      result.current.handleTagFriends('friend2');
    });

    expect(result.current.selectedTagFriends).toEqual(['friend1', 'friend2']);

    act(() => {
      result.current.handleRemoveFriend('friend1');
    });

    expect(result.current.selectedTagFriends).toEqual(['friend2']);

    act(() => {
      result.current.handleRemoveAllFriends();
    });

    expect(result.current.selectedTagFriends).toEqual([]);
  });

  it('generates correct FormData', () => {
    const { result } = renderHook(() => useComposeFeedForm());
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const mockValues = {
      content: 'test content',
      media: mockFile,
      accessItems: ['activityFeed'],
      activityRole: 'friends',
      storyRole: 'public',
      gifUrl: 'gif-url',
      tagFriends: ['friend1'],
      mood: { title: 'Happy', content: '😊' },
      sharedLink: 'https://example.com',
      location: 'New York',
      sendFriends: ['friend2'],
    };

    const formData = result.current.getFormData(mockValues);

    expect(formData.get('content')).toBe('test content');
    expect(formData.get('media')).toBe(mockFile);
    expect(formData.get('activityRole')).toBe('friends');
    expect(formData.get('storyRole')).toBe('public');
    expect(formData.get('gifUrl')).toBe('gif-url');
    expect(formData.get('sharedLink')).toBe('https://example.com');
    expect(formData.get('location')).toBe('New York');
    expect(formData.get('mood.title')).toBe('Happy');
    expect(formData.get('mood.content')).toBe('😊');
  });

  it('resets form state correctly', () => {
    const { result } = renderHook(() => useComposeFeedForm());

    act(() => {
      result.current.handleTagFriends('friend1');
      result.current.handleGifSelect('gif-url');
      result.current.handleSelectMood({ title: 'Happy', content: '😊' });
      result.current.resetFormState();
    });

    expect(result.current.selectedTagFriends).toEqual([]);
    expect(result.current.selectedGifUrl).toBe('');
    expect(result.current.selectedMood).toEqual({ title: '', content: '' });
    expect(result.current.form.getValues()).toEqual({
      content: '',
      accessItems: ['activityFeed'],
      activityRole: 'friends',
      storyRole: 'friends',
      media: null,
      gifUrl: '',
      tagFriends: [],
      mood: { title: '', content: '' },
      sharedLink: '',
      location: '',
      sendFriends: [],
    });
  });

  it('handles tag friends toggle correctly', () => {
    const { result } = renderHook(() => useComposeFeedForm());

    // Test adding a friend
    act(() => {
      result.current.handleTagFriends('friend1');
    });
    expect(result.current.selectedTagFriends).toEqual(['friend1']);

    // Test removing the same friend by toggling
    act(() => {
      result.current.handleTagFriends('friend1');
    });
    expect(result.current.selectedTagFriends).toEqual([]);
  });
});
