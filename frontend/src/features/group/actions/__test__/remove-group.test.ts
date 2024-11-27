import { removeGroupById } from '../remove-group';
import { apiClient } from '@/services/api';
import { revalidateTag } from 'next/cache';

jest.mock('@/services/api');
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('removeGroupById', () => {
  const mockParams = {
    groupId: '1',
    groupName: 'test-group',
    userId: '456',
    page: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should remove group successfully and revalidate all tags', async () => {
    (apiClient.remove as jest.Mock).mockResolvedValue({});

    await removeGroupById(mockParams);

    expect(apiClient.remove).toHaveBeenCalledWith('api/groups/1');
    expect(revalidateTag).toHaveBeenCalledWith('api-list-groups-456-in-page-1');
    expect(revalidateTag).toHaveBeenCalledWith(
      'api-group-detail-by-test-group',
    );
  });

  it('should remove group without userId and page', async () => {
    const paramsWithoutUserIdAndPage = {
      groupId: '1',
      groupName: 'test-group',
    };

    await removeGroupById(paramsWithoutUserIdAndPage);

    expect(apiClient.remove).toHaveBeenCalledWith('api/groups/1');
    expect(revalidateTag).toHaveBeenCalledWith(
      'api-group-detail-by-test-group',
    );
  });

  it('should remove group without groupName', async () => {
    const paramsWithoutGroupName = {
      groupId: '1',
      userId: '456',
      page: 1,
    };

    await removeGroupById(paramsWithoutGroupName);

    expect(apiClient.remove).toHaveBeenCalledWith('api/groups/1');
    expect(revalidateTag).toHaveBeenCalledWith('api-list-groups-456-in-page-1');
  });

  it('should handle API error', async () => {
    const mockError = new Error('Failed to remove');
    (apiClient.remove as jest.Mock).mockRejectedValue(mockError);

    const result = await removeGroupById(mockParams);

    expect(result).toEqual({
      error: 'Failed to remove',
    });
  });

  it('should return default error message when error has no message', async () => {
    (apiClient.remove as jest.Mock).mockRejectedValue({});

    const result = await removeGroupById(mockParams);

    expect(result).toEqual({
      error: 'Failed to remove group. Please try again.',
    });
  });
});
