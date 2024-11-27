import { getNewsFeeds, getNewsFeedIds } from '../get-news-feeds';
import { apiClient } from '@/services/api';

jest.mock('@/services/api');

describe('News Feeds Actions', () => {
  const userId = '123';
  const mockNewsFeedResponse = {
    data: [
      {
        id: 1,
        content: 'Test post',
        documentId: 'doc1',
        likes: [
          { user: { id: 1, name: 'User 1' }, createdAt: '2024-01-01' },
          { user: { id: 2, name: 'User 2' }, createdAt: '2024-01-02' },
          { user: { id: 3, name: 'User 3' }, createdAt: '2024-01-03' },
        ],
        createdAt: '2024-01-01',
      },
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        total: 1,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getNewsFeeds', () => {
    it('should fetch and transform news feeds successfully', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue(mockNewsFeedResponse);

      const result = await getNewsFeeds(userId);

      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('/posts'),
        expect.any(Object),
      );

      expect(result.data?.data[0]).toEqual(
        expect.objectContaining({
          documentId: 'doc1',
          tagFriends: [],
          sendFriends: [],
          likes: {
            likesTotal: 3,
            remainingLikes: 1,
            likesRecent: expect.any(Array),
          },
          isLiked: false,
        }),
      );
    });

    it('should handle API errors with custom message', async () => {
      const mockError = new Error('Custom API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      const result = await getNewsFeeds(userId);

      expect(result).toEqual({
        error: 'Custom API Error',
      });
    });

    it('should handle API errors without message', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue({});

      const result = await getNewsFeeds(userId);

      expect(result).toEqual({
        error: 'Failed to fetch news feeds. Please try again.',
      });
    });
  });

  describe('getNewsFeedIds', () => {
    const mockIdsResponse = {
      data: ['id1', 'id2'],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          total: 2,
        },
      },
    };

    it('should fetch news feed ids successfully', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue(mockIdsResponse);

      const result = await getNewsFeedIds(userId);

      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('/posts'),
        expect.any(Object),
      );
      expect(result).toEqual({ data: mockIdsResponse });
    });

    it('should handle API errors with custom message', async () => {
      const mockError = new Error('Custom API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      const result = await getNewsFeedIds(userId);

      expect(result).toEqual({
        error: 'Custom API Error',
      });
    });

    it('should handle API errors without message', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue({});

      const result = await getNewsFeedIds(userId);

      expect(result).toEqual({
        error: 'Failed to fetch news feed ids. Please try again.',
      });
    });
  });
});
