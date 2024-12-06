import { publishComment } from '../publish-comment';
import { apiClient } from '@/services/api';
import { upload } from '@/services/upload';
import { ActionState } from '@/types';
import { CommentPayload } from '@/models';

jest.mock('@/services/api');
jest.mock('@/services/upload');

describe('Publish Comment Actions', () => {
  const mockNewsFeed = {
    id: 123,
    authorId: 456,
    commentId: 789,
  };
  const mockFormData = new FormData();
  const mockPrevState: ActionState<CommentPayload> = {
    data: undefined,
    error: null,
    message: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormData.set('content', 'Test Comment');
    mockFormData.append('tagFriends', '123');
  });

  it('should publish comment successfully without media', async () => {
    const expectedResponse = {
      id: 1,
      content: 'Test Comment',
      friend: mockNewsFeed.authorId,
    };

    (apiClient.post as jest.Mock).mockResolvedValue({ data: expectedResponse });

    const result = await publishComment(
      mockNewsFeed,
      mockPrevState,
      mockFormData,
    );

    expect(apiClient.post).toHaveBeenCalledWith({
      path: expect.stringContaining('/comments'),
      body: expect.stringContaining('Test Comment'),
    });
    expect(result).toEqual({
      data: expectedResponse,
      message: 'Comment published successfully',
      error: null,
    });
  });

  it('should publish comment successfully with media', async () => {
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    mockFormData.set('media', mockFile);
    const mockImageUrl = 'http://example.com/image.jpg';

    (upload as jest.Mock).mockResolvedValue(mockImageUrl);
    (apiClient.post as jest.Mock).mockResolvedValue({
      data: {
        id: 1,
        content: 'Test Comment',
        media: mockImageUrl,
      },
    });

    const result = await publishComment(
      mockNewsFeed,
      mockPrevState,
      mockFormData,
    );

    expect(upload).toHaveBeenCalledWith(mockFile);
    expect(apiClient.post).toHaveBeenCalledWith({
      path: expect.stringContaining('/comments'),
      body: expect.stringContaining(mockImageUrl),
    });
    expect(result.error).toBeNull();
    expect(result.message).toBe('Comment published successfully');
  });

  it('should return error when authorId is not provided', async () => {
    const result = await publishComment(
      { ...mockNewsFeed, authorId: 0 },
      mockPrevState,
      mockFormData,
    );

    expect(result).toEqual({
      message: null,
      error:
        'Authentication Required. You must be logged in to publish a comment.',
    });
    expect(apiClient.post).not.toHaveBeenCalled();
  });

  it('should handle API errors with custom message', async () => {
    const mockError = new Error('Custom API Error');
    (apiClient.post as jest.Mock).mockRejectedValue(mockError);

    const result = await publishComment(
      mockNewsFeed,
      mockPrevState,
      mockFormData,
    );

    expect(result).toEqual({
      error: 'Custom API Error',
    });
  });

  it('should handle API errors without message', async () => {
    (apiClient.post as jest.Mock).mockRejectedValue({});

    const result = await publishComment(
      mockNewsFeed,
      mockPrevState,
      mockFormData,
    );

    expect(result).toEqual({
      error: 'Failed to publish a comment. Please try again.',
    });
  });
});
