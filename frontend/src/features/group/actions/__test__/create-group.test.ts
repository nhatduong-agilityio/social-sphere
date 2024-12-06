import { GroupModel } from '@/models';
import { createGroup } from '../create-group';
import { apiClient } from '@/services/api';
import { upload } from '@/services/upload';
import { ActionState } from '@/types';
import { revalidateTag } from 'next/cache';

jest.mock('@/services/api');
jest.mock('@/services/upload');
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('createGroup', () => {
  const mockAuthorId = 123;
  const mockFormData = new FormData();
  const mockPrevState: ActionState<GroupModel> = {
    data: undefined,
    error: null,
    message: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormData.set('name', 'Test Group');
    mockFormData.set('description', 'Test Description');
  });

  it('should create a group successfully without avatar and revalidate path', async () => {
    const expectedResponse = {
      id: 1,
      name: 'Test Group',
      description: 'Test Description',
    };

    (apiClient.post as jest.Mock).mockResolvedValue({ data: expectedResponse });

    const result = await createGroup(mockAuthorId, mockPrevState, mockFormData);

    expect(apiClient.post).toHaveBeenCalledWith({
      path: 'api/groups',
      body: JSON.stringify({
        data: {
          name: 'Test Group',
          description: 'Test Description',
          isPrivate: true,
          createdUser: mockAuthorId,
        },
      }),
    });

    expect(revalidateTag).toHaveBeenCalledWith('api-list-groups-123-in-page-1');
    expect(result).toEqual({
      data: expectedResponse,
      message: 'Group created successfully',
      error: null,
    });
  });

  it('should create a group successfully with avatar', async () => {
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    mockFormData.set('avatar', mockFile);
    const mockImageUrl = 'http://example.com/image.jpg';

    (upload as jest.Mock).mockResolvedValue(mockImageUrl);
    (apiClient.post as jest.Mock).mockResolvedValue({
      data: {
        id: 1,
        name: 'Test Group',
        description: 'Test Description',
        avatar: mockImageUrl,
      },
    });

    const result = await createGroup(mockAuthorId, mockPrevState, mockFormData);

    expect(upload).toHaveBeenCalledWith(mockFile);
    expect(apiClient.post).toHaveBeenCalledWith({
      path: 'api/groups',
      body: JSON.stringify({
        data: {
          name: 'Test Group',
          description: 'Test Description',
          isPrivate: true,
          createdUser: mockAuthorId,
          avatar: mockImageUrl,
        },
      }),
    });

    expect(result.error).toBeNull();
    expect(result.message).toBe('Group created successfully');
  });

  it('should return error when authorId is not provided', async () => {
    const result = await createGroup(0, mockPrevState, mockFormData);

    expect(result).toEqual({
      message: null,
      error: 'Authentication Required. You must be logged in to create a post',
    });
    expect(apiClient.post).not.toHaveBeenCalled();
  });

  it('should handle API errors', async () => {
    const mockError = new Error('API Error');
    (apiClient.post as jest.Mock).mockRejectedValue(mockError);

    const result = await createGroup(mockAuthorId, mockPrevState, mockFormData);

    expect(result).toEqual({
      error: 'API Error',
    });
  });

  it('should return default error message when error has no message', async () => {
    const mockError = {};
    (apiClient.post as jest.Mock).mockRejectedValue(mockError);

    const result = await createGroup(mockAuthorId, mockPrevState, mockFormData);

    expect(result).toEqual({
      error: 'Failed to create a group. Please try again.',
    });
  });
});
