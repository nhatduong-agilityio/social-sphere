import { shareNewFeeds } from '../share-news-feed';
import { apiClient } from '@/services/api';
import { revalidateTag } from 'next/cache';
import { ShareTypeOption } from '@/types';

jest.mock('@/services/api');
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('Share News Feed Actions', () => {
  const mockNewsDeed = {
    id: 123,
    authorId: 456,
  };
  const mockFormData = new FormData();
  const mockPrevState = {
    data: undefined,
    error: null,
    message: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormData.set('content', 'Test share');
    mockFormData.append('tagFriends', '789');
    mockFormData.set('location', 'Test Location');
    mockFormData.set('activityRole', 'default');
  });

  it('should share to news feed successfully', async () => {
    mockFormData.set('friendsFeed', '1');
    const expectedResponse = {
      postId: mockNewsDeed.id,
      userId: mockNewsDeed.authorId,
      shareType: ShareTypeOption.YOUR_FEED,
    };

    (apiClient.post as jest.Mock).mockResolvedValue({ data: expectedResponse });

    const result = await shareNewFeeds(
      mockNewsDeed,
      mockPrevState,
      mockFormData,
    );

    expect(apiClient.post).toHaveBeenCalledWith({
      path: 'api/shares/create',
      body: JSON.stringify({
        data: {
          postId: 123,
          userId: 456,
          content: 'Test share',
          tagFriends: ['789'],
          location: 'Test Location',
          activityRole: 'default',
          friendsFeed: 1,
          shareType: 'friendsFeed',
        },
      }),
    });
    expect(result).toEqual({
      data: expectedResponse,
      message: 'Shared successfully',
      error: null,
    });
  });

  it('should share to group successfully', async () => {
    const groupId = '999';
    mockFormData.set('group', groupId);

    await shareNewFeeds(mockNewsDeed, mockPrevState, mockFormData);

    expect(apiClient.post).toHaveBeenCalled();
    expect(revalidateTag).toHaveBeenCalledWith(
      `api-news-feed-ids-in-group-${groupId}-in-page-1`,
    );
  });

  it('should return error when authorId is not provided', async () => {
    const result = await shareNewFeeds(
      { ...mockNewsDeed, authorId: 0 },
      mockPrevState,
      mockFormData,
    );

    expect(result).toEqual({
      message: null,
      error:
        'Authentication Required. You must be logged in to share a news feed.',
    });
    expect(apiClient.post).not.toHaveBeenCalled();
  });

  it('should handle API errors with custom message', async () => {
    const mockError = new Error('Custom API Error');
    (apiClient.post as jest.Mock).mockRejectedValue(mockError);

    const result = await shareNewFeeds(
      mockNewsDeed,
      mockPrevState,
      mockFormData,
    );

    expect(result).toEqual({
      error: 'Custom API Error',
    });
  });

  it('should handle API errors without message', async () => {
    (apiClient.post as jest.Mock).mockRejectedValue({});

    const result = await shareNewFeeds(
      mockNewsDeed,
      mockPrevState,
      mockFormData,
    );

    expect(result).toEqual({
      error: 'Failed to share a news feed. Please try again.',
    });
  });
});
