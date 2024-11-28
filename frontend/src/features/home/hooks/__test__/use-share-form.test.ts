import { renderHook, act } from '@testing-library/react';
import { useShareForm } from '../use-share-form';

describe('useShareForm', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useShareForm());

    expect(result.current.form.getValues()).toEqual({
      content: '',
      tagFriends: [],
      activityRole: 'friends',
      location: '',
      friendsFeed: '',
      group: '',
      page: '',
      friendsMessage: '',
    });
  });

  it('handles tag friends operations correctly', () => {
    const { result } = renderHook(() => useShareForm());

    // Add friends
    act(() => {
      result.current.handleTagFriends('friend1');
      result.current.handleTagFriends('friend2');
    });
    expect(result.current.selectedTagFriends).toEqual(['friend1', 'friend2']);

    // Remove one friend
    act(() => {
      result.current.handleRemoveFriend('friend1');
    });
    expect(result.current.selectedTagFriends).toEqual(['friend2']);

    // Remove all friends
    act(() => {
      result.current.handleRemoveAllFriends();
    });
    expect(result.current.selectedTagFriends).toEqual([]);
  });

  it('handles friends feed operations correctly', () => {
    const { result } = renderHook(() => useShareForm());

    act(() => {
      result.current.handleFriendsFeed('friend1');
    });
    expect(result.current.selectedFriendsFeed).toBe('friend1');

    act(() => {
      result.current.handleRemoveFriendsFeed();
    });
    expect(result.current.selectedFriendsFeed).toBe('');
  });

  it('handles friends message operations correctly', () => {
    const { result } = renderHook(() => useShareForm());

    act(() => {
      result.current.handleFriendsMessage('friend1');
    });
    expect(result.current.selectedFriendsMessage).toBe('friend1');

    act(() => {
      result.current.handleRemoveFriendsMessage();
    });
    expect(result.current.selectedFriendsMessage).toBe('');
  });

  it('handles group operations correctly', () => {
    const { result } = renderHook(() => useShareForm());

    act(() => {
      result.current.handleSelectGroup('group1');
    });
    expect(result.current.selectedGroup).toBe('group1');

    act(() => {
      result.current.handleRemoveGroup();
    });
    expect(result.current.selectedGroup).toBe('');
  });

  it('generates correct FormData', () => {
    const { result } = renderHook(() => useShareForm());
    const mockValues = {
      content: 'test content',
      tagFriends: ['friend1', 'friend2'],
      activityRole: 'public',
      location: 'New York',
      friendsFeed: 'friend3',
      group: 'group1',
      page: 'page1',
      friendsMessage: 'friend4',
    };

    const formData = result.current.getFormData(mockValues);

    expect(formData.get('content')).toBe('test content');
    expect(formData.get('activityRole')).toBe('public');
    expect(formData.get('location')).toBe('New York');
    expect(formData.get('friendsFeed')).toBe('friend3');
    expect(formData.get('group')).toBe('group1');
    expect(formData.get('page')).toBe('page1');
    expect(formData.get('friendsMessage')).toBe('friend4');
    expect(formData.getAll('tagFriends')).toEqual(['friend1', 'friend2']);
  });

  it('handles tag friends toggle correctly', () => {
    const { result } = renderHook(() => useShareForm());

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
