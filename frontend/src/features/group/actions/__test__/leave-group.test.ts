import { leaveGroupById } from '../leave-group';
import { apiClient } from '@/services/api';
import { revalidateTag } from 'next/cache';

jest.mock('@/services/api');
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('leaveGroupById', () => {
  const mockParams = {
    groupId: '1',
    groupMemberId: '123',
    userId: '456',
    page: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should leave group successfully and revalidate tags', async () => {
    (apiClient.remove as jest.Mock).mockResolvedValue({});

    await leaveGroupById(mockParams);

    expect(apiClient.remove).toHaveBeenCalledWith('api/group-members/123');
    expect(revalidateTag).toHaveBeenCalledWith('api-list-groups-456-in-page-1');
    expect(revalidateTag).toHaveBeenCalledWith(
      'api-group-members-by-1-in-page-1',
    );
  });

  it('should handle leaving group without userId and page', async () => {
    const paramsWithoutUserIdAndPage = {
      groupId: '1',
      groupMemberId: '123',
    };

    await leaveGroupById(paramsWithoutUserIdAndPage);

    expect(apiClient.remove).toHaveBeenCalledWith('api/group-members/123');
    expect(revalidateTag).toHaveBeenCalledWith(
      'api-group-members-by-1-in-page-1',
    );
  });

  it('should handle API error', async () => {
    const mockError = new Error('Failed to leave');
    (apiClient.remove as jest.Mock).mockRejectedValue(mockError);

    const result = await leaveGroupById(mockParams);

    expect(result).toEqual({
      error: 'Failed to leave',
    });
  });

  it('should return default error message when error has no message', async () => {
    (apiClient.remove as jest.Mock).mockRejectedValue({});

    const result = await leaveGroupById(mockParams);

    expect(result).toEqual({
      error: 'Failed to leave group. Please try again.',
    });
  });
});
