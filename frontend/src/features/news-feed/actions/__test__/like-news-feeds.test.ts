import { toggleLikeNewsFeed } from '../like-news-feed';
import { apiClient } from '@/services/api';
import { revalidateTag } from 'next/cache';

jest.mock('@/services/api');
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('Like News Feed Actions', () => {
  const newsFeedId = 123;
  const userId = 456;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('toggleLikeNewsFeed', () => {
    it('should add like when no existing like found', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: [] });
      (apiClient.post as jest.Mock).mockResolvedValueOnce({});

      const result = await toggleLikeNewsFeed(newsFeedId, userId);

      expect(apiClient.post).toHaveBeenCalledWith({
        path: expect.stringContaining('/likes'),
        body: JSON.stringify({
          data: {
            post: newsFeedId,
            user: userId,
          },
        }),
      });
      expect(result).toBeUndefined();
    });

    it('should remove like when existing like found', async () => {
      const existingLikeId = 'like123';
      (apiClient.get as jest.Mock).mockResolvedValueOnce({
        data: [{ documentId: existingLikeId }],
      });

      const result = await toggleLikeNewsFeed(newsFeedId, userId);

      expect(result).toBeUndefined();
    });

    it('should handle API errors with custom message', async () => {
      const mockError = new Error('Custom API Error');
      (apiClient.post as jest.Mock).mockRejectedValueOnce(mockError);
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: [] });

      const result = await toggleLikeNewsFeed(newsFeedId, userId);

      expect(result).toEqual({
        error: 'Custom API Error',
      });
      expect(revalidateTag).not.toHaveBeenCalled();
    });

    it('should handle API errors without message', async () => {
      (apiClient.post as jest.Mock).mockRejectedValueOnce({});
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: [] });

      const result = await toggleLikeNewsFeed(newsFeedId, userId);

      expect(result).toEqual({
        error: 'Failed to toggle news feed like. Please try again.',
      });
      expect(revalidateTag).not.toHaveBeenCalled();
    });
  });
});
