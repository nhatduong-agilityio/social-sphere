import { NewsFeed } from '@/types';
import { publishNewsFeed } from '../create-news-feed';
import { apiClient } from '@/services/api';
import { upload } from '@/services/upload';
import { ActionState } from '@/types';

jest.mock('@/services/api');
jest.mock('@/services/upload');
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('publishNewsFeed', () => {
  const mockAuthorId = '123';
  const mockFormData = new FormData();
  const mockPrevState: ActionState<NewsFeed> = {
    data: undefined,
    error: null,
    message: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormData.set('content', 'Test Content');
    mockFormData.set('activityRole', 'default');
    mockFormData.set('storyRole', 'default');
    mockFormData.set('mood.title', 'Happy');
    mockFormData.set('mood.content', '😊');
    mockFormData.append('accessItems', 'public');
    mockFormData.append('tagFriends', '456');
    mockFormData.append('sendFriends', '789');
  });

  it('should create a news feed successfully without media', async () => {
    const expectedResponse = {
      id: 1,
      content: 'Test Content',
      author: mockAuthorId,
    };

    (apiClient.post as jest.Mock).mockResolvedValue({ data: expectedResponse });

    const result = await publishNewsFeed(
      mockAuthorId,
      mockPrevState,
      mockFormData,
    );

    expect(apiClient.post).toHaveBeenCalledWith({
      path: 'api/posts',
      body: expect.stringContaining('Test Content'),
    });

    expect(result).toEqual({
      data: expectedResponse,
      message: 'News feed published successfully',
      error: null,
    });
  });

  it('should create a news feed successfully with media', async () => {
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    mockFormData.set('media', mockFile);
    const mockImageUrl = 'http://example.com/image.jpg';

    (upload as jest.Mock).mockResolvedValue(mockImageUrl);
    (apiClient.post as jest.Mock).mockResolvedValue({
      data: {
        id: 1,
        content: 'Test Content',
        author: mockAuthorId,
        media: mockImageUrl,
      },
    });

    const result = await publishNewsFeed(
      mockAuthorId,
      mockPrevState,
      mockFormData,
    );

    expect(upload).toHaveBeenCalledWith(mockFile);
    expect(apiClient.post).toHaveBeenCalledWith({
      path: 'api/posts',
      body: expect.stringContaining(mockImageUrl),
    });

    expect(result.error).toBeNull();
    expect(result.message).toBe('News feed published successfully');
  });

  it('should return error when authorId is not provided', async () => {
    const result = await publishNewsFeed(
      undefined,
      mockPrevState,
      mockFormData,
    );

    expect(result).toEqual({
      message: null,
      error: 'Authentication Required. You must be logged in to create a post',
    });
    expect(apiClient.post).not.toHaveBeenCalled();
  });

  it('should handle API errors', async () => {
    const mockError = new Error('API Error');
    (apiClient.post as jest.Mock).mockRejectedValue(mockError);

    const result = await publishNewsFeed(
      mockAuthorId,
      mockPrevState,
      mockFormData,
    );

    expect(result).toEqual({
      error: 'API Error',
    });
  });

  it('should return default error message when error has no message', async () => {
    const mockError = {};
    (apiClient.post as jest.Mock).mockRejectedValue(mockError);

    const result = await publishNewsFeed(
      mockAuthorId,
      mockPrevState,
      mockFormData,
    );

    expect(result).toEqual({
      error: 'Failed to publish a news feed. Please try again.',
    });
  });
});
