// Constants
import { CURRENT_PAGE, PAGE_SIZE } from '@/constants';

// Models
import { NewsFeedDetailResponse } from '@/models';

// Actions
import {
  fetchNewsFeedDetail,
  fetchNewsFeedDetailAndComments,
  fetchNewsFeedIds,
} from '../fetch-news-feed';
import { fetchNewsFeedComments } from '../fetch-comment';

// Mocks
import { MOCK_NEWS_FEED_LIST } from '@/__mocks__';

jest.mock('../fetch-comment', () => ({
  fetchNewsFeedComments: jest.fn(),
}));

const mockResponse: NewsFeedDetailResponse = {
  data: [
    {
      id: 1,
      likes: [
        {
          user: {
            id: 123,
            firstName: 'John',
            username: 'johndoe',
            email: 'admin@gmail.com',
            lastName: 'Doe',
            followedRelationships: [],
          },
          createdAt: '2024-11-01',
          id: 0,
          documentId: '1',
        },
      ],
      createdAt: '2024-11-01',
      content: 'This is a test news feed',
      author: {
        id: 123,
        firstName: 'John',
        username: 'johndoe',
        email: 'admin@gmail.com',
        lastName: 'Doe',
        followedRelationships: [],
      },
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

describe('News Feed API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchNewsFeedIds', () => {
    const mockParams = {
      authorId: '123',
      groupId: 456,
      page: 1,
      pageSize: 10,
    };

    it('should fetch news feed IDs successfully', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(MOCK_NEWS_FEED_LIST),
        }),
      ) as jest.Mock;

      const result = await fetchNewsFeedIds(mockParams);

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/news-feed?authorId=123&groupId=456&page=1&pageSize=10',
      );
      expect(result).toEqual(MOCK_NEWS_FEED_LIST);
    });

    it('should throw an error if the fetch fails', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
        }),
      ) as jest.Mock;

      await expect(fetchNewsFeedIds(mockParams)).rejects.toThrow(
        'Failed to fetch news feed ids',
      );
    });
  });

  describe('fetchNewsFeedDetail', () => {
    const mockParams = { newsFeedId: '1' };

    it('should fetch news feed details successfully', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        }),
      ) as jest.Mock;

      const result = await fetchNewsFeedDetail(mockParams);

      expect(global.fetch).toHaveBeenCalledWith('/api/news-feed/1');
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the fetch fails', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
        }),
      ) as jest.Mock;

      await expect(fetchNewsFeedDetail(mockParams)).rejects.toThrow(
        'Failed to fetch news feed details',
      );
    });
  });

  describe('fetchNewsFeedDetailAndComments', () => {
    const mockParams = {
      newsFeedId: '1',
      authorId: '123',
    };

    const mockCommentsResponse = {
      data: [
        {
          id: '1',
          friend: { id: 123 },
          replies: [],
          likes: [],
        },
      ],
    };

    it('should fetch news feed detail and comments successfully', async () => {
      global.fetch = jest.fn((url) => {
        if (url.includes('/api/news-feed/1')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse),
          });
        }
        return Promise.reject(new Error('Unexpected URL'));
      }) as jest.Mock;

      (fetchNewsFeedComments as jest.Mock).mockResolvedValue(
        mockCommentsResponse,
      );

      const result = await fetchNewsFeedDetailAndComments(mockParams);

      expect(global.fetch).toHaveBeenCalledWith('/api/news-feed/1');
      expect(fetchNewsFeedComments).toHaveBeenCalledWith({
        newsFeedId: '1',
        page: CURRENT_PAGE,
        pageSize: PAGE_SIZE,
      });
      expect(result).toMatchObject({
        id: 1,
        createdAt: '2024-11-01',
        comments: {
          data: [
            {
              id: '1',
              isOwner: true,
            },
          ],
        },
      });
    });

    it('should throw an error if either fetch fails', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
        }),
      ) as jest.Mock;

      await expect(
        fetchNewsFeedDetailAndComments(mockParams),
      ).rejects.toThrow();
    });
  });
});
