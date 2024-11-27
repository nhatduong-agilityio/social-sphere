// Services
import { apiClient } from '@/services';

// Mocks
import { MOCK_NEWS_FEED_LIST } from '@/__mocks__';

// Services
import { getNewsFeedIds } from '../get-news-feeds';

jest.mock('@/services', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe('getNewsFeedIds Service', () => {
  const userId = 'user123';
  const page = 1;
  const pageSize = 10;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch news feed ids successfully', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue(MOCK_NEWS_FEED_LIST);

    const result = await getNewsFeedIds(userId, page, pageSize);

    expect(apiClient.get).toHaveBeenCalled();
    expect(result).toEqual({ data: MOCK_NEWS_FEED_LIST });
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Network Error';
    (apiClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const result = await getNewsFeedIds(userId, page, pageSize);

    expect(apiClient.get).toHaveBeenCalled();
    expect(result).toEqual({
      error: errorMessage,
    });
  });

  it('should use default page and pageSize when not provided', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue(MOCK_NEWS_FEED_LIST);

    const result = await getNewsFeedIds(userId);

    expect(apiClient.get).toHaveBeenCalled();
    expect(result).toEqual({ data: MOCK_NEWS_FEED_LIST });
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Network Error';
    (apiClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const result = await getNewsFeedIds(userId, page, pageSize);

    expect(apiClient.get).toHaveBeenCalled();
    expect(result).toEqual({
      error: errorMessage,
    });
  });

  it('should return the default error message when no error message is provided', async () => {
    (apiClient.get as jest.Mock).mockRejectedValue({});

    const result = await getNewsFeedIds(userId, page, pageSize);

    expect(result).toEqual({
      error: 'Failed to fetch news feed ids. Please try again.',
    });
  });
});
