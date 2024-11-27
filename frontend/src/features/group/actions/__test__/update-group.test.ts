import { updateGroup, updateGroupAction } from '../update-group';
import { apiClient } from '@/services/api';
import { upload } from '@/services/upload';
import { ActionState, GroupDetail } from '@/types';
import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

jest.mock('@/services/api');
jest.mock('@/services/upload');
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('Group Update Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateGroup', () => {
    const mockGroupId = '123';
    const mockData = {
      name: 'Updated Group',
      description: 'Updated Description',
    } as GroupDetail;

    it('should update group successfully', async () => {
      const mockResponse = { data: mockData };
      (apiClient.put as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await updateGroup(mockGroupId, mockData);

      expect(apiClient.put).toHaveBeenCalledWith(
        'api/groups/123',
        JSON.stringify({ data: mockData }),
      );
      expect(revalidateTag).toHaveBeenCalledWith(
        'api-group-detail-by-undefined',
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle not found case', async () => {
      (apiClient.put as jest.Mock).mockResolvedValue({ data: null });
      await updateGroup(mockGroupId, mockData);
      expect(notFound).toHaveBeenCalled();
    });
  });

  describe('updateGroupAction', () => {
    const mockGroupId = '123';
    const mockPrevState: ActionState<GroupDetail> = {
      data: undefined,
      error: null,
      message: null,
    };
    const mockFormData = new FormData();

    beforeEach(() => {
      mockFormData.set('name', 'Updated Group');
      mockFormData.set('description', 'Updated Description');
    });

    it('should update group successfully without avatar', async () => {
      const mockResponse = {
        data: {
          name: 'Updated Group',
          description: 'Updated Description',
        },
      };

      (apiClient.put as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await updateGroupAction(
        mockGroupId,
        mockPrevState,
        mockFormData,
      );

      expect(apiClient.put).toHaveBeenCalledWith(
        'api/groups/123',
        JSON.stringify({
          data: {
            name: 'Updated Group',
            description: 'Updated Description',
          },
        }),
      );
      expect(result).toEqual({
        data: mockResponse,
        message: 'Group updated successfully',
        error: null,
      });
    });

    it('should update group successfully with avatar', async () => {
      const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      mockFormData.set('avatar', mockFile);
      const mockImageUrl = 'http://example.com/image.jpg';

      (upload as jest.Mock).mockResolvedValue(mockImageUrl);
      (apiClient.put as jest.Mock).mockResolvedValue({
        data: {
          name: 'Updated Group',
          description: 'Updated Description',
          avatar: mockImageUrl,
        },
      });

      const result = await updateGroupAction(
        mockGroupId,
        mockPrevState,
        mockFormData,
      );

      expect(upload).toHaveBeenCalledWith(mockFile);
      expect(result.error).toBeNull();
      expect(result.message).toBe('Group updated successfully');
    });

    it('should handle API error', async () => {
      const mockError = new Error('Update failed');
      (apiClient.put as jest.Mock).mockRejectedValue(mockError);

      const result = await updateGroupAction(
        mockGroupId,
        mockPrevState,
        mockFormData,
      );

      expect(result).toEqual({
        error: 'Update failed',
      });
    });

    it('should handle default error message', async () => {
      (apiClient.put as jest.Mock).mockRejectedValue({});

      const result = await updateGroupAction(
        mockGroupId,
        mockPrevState,
        mockFormData,
      );

      expect(result).toEqual({
        error: 'Failed to create a group. Please try again.',
      });
    });
  });
});
