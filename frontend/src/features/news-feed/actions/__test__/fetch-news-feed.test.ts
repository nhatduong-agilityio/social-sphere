import { NewsFeed } from '@/types';
import { fetchNewsFeedDetail, fetchNewsFeedIds } from '../fetch-news-feed';
import { NewsFeedDetailResponse, NewsFeedIdsResponse } from '@/models';
import { MOCK_FRIENDS } from '@/__mocks__';
import { NewsFeedsContext } from '../../constants';

global.fetch = jest.fn();

describe('News Feed Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchNewsFeedIds', () => {
    it('should fetch news feed ids successfully', async () => {
      const mockResponse: NewsFeedIdsResponse = {
        data: [
          {
            id: 1,
            createdAt: '',
            documentId: '1',
          },
        ],
        meta: {
          pagination: {
            page: 1,
            pageSize: 10,
            pageCount: 1,
            total: 1,
          },
        },
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const params = {
        authorId: '123',
        context: NewsFeedsContext.PERSONAL,
        groupId: 1,
        page: 1,
        pageSize: 10,
      };
      const result = await fetchNewsFeedIds(params);

      expect(fetch).toHaveBeenCalledWith(
        `/api/news-feed?authorId=123&groupId=1&context=personal&page=1&pageSize=10`,
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when the API call fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const params = {
        authorId: '123',
        context: NewsFeedsContext.PERSONAL,
        groupId: 1,
        page: 1,
        pageSize: 10,
      };

      await expect(fetchNewsFeedIds(params)).rejects.toThrow(
        'Failed to fetch news feed ids',
      );
    });
  });

  describe('fetchNewsFeedDetail', () => {
    it('should fetch news feed detail successfully and transform data', async () => {
      const mockResponse: NewsFeedDetailResponse = {
        data: [
          {
            id: 1,
            createdAt: '2024-01-01T00:00:00Z',
            documentId: '1',
            likes: [
              {
                user: MOCK_FRIENDS[0],
                createdAt: '2024-01-01T00:00:00Z',
                id: 0,
                documentId: '',
              },
              {
                user: MOCK_FRIENDS[1],
                createdAt: '2024-01-01T00:00:00Z',
                id: 1,
                documentId: '',
              },
            ],
            author: MOCK_FRIENDS[0],
            content: 'Test content',
          },
        ],
        meta: {
          pagination: {
            page: 1,
            pageSize: 10,
            pageCount: 1,
            total: 1,
          },
        },
      };
      const transformedResponse: NewsFeed = {
        id: 1,
        content: 'Test content',
        author: MOCK_FRIENDS[0],
        createdAt: '2024-01-01T00:00:00Z',
        documentId: '1',
        likes: {
          likesTotal: 2,
          remainingLikes: 0,
          likesRecent: [
            {
              friend: MOCK_FRIENDS[0],
              createdAt: '2024-01-01T00:00:00Z',
            },
            {
              friend: MOCK_FRIENDS[1],
              createdAt: '2024-01-01T00:00:00Z',
            },
          ],
        },
        isLiked: false,
        sendFriends: [],
        tagFriends: [],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const params = { newsFeedId: '1', authorId: '123' };
      const result = await fetchNewsFeedDetail(params);

      expect(fetch).toHaveBeenCalledWith(`/api/news-feed/1`);
      expect(result).toEqual(transformedResponse);
    });

    it('should throw an error when the API call fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const params = { newsFeedId: '1', authorId: '123' };

      await expect(fetchNewsFeedDetail(params)).rejects.toThrow(
        'Failed to fetch news feed details',
      );
    });
  });
});
