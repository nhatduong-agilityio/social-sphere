import { inviteToGroup } from '../invite-to-group';
import { apiClient } from '@/services/api';
import { GroupRole } from '@/types';
import { revalidateTag } from 'next/cache';

jest.mock('@/services/api');
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('inviteToGroup', () => {
  const mockGroupId = 1;
  const mockUserId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should invite user to group successfully', async () => {
    const mockResponse = {
      data: {
        id: 1,
      },
    };

    (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await inviteToGroup(mockGroupId, mockUserId);

    expect(apiClient.post).toHaveBeenCalledWith({
      path: 'api/group-members',
      body: JSON.stringify({
        data: {
          group: mockGroupId,
          user: mockUserId,
          role: GroupRole.MEMBER,
        },
      }),
    });

    expect(revalidateTag).toHaveBeenCalledWith(
      `api-group-members-by-${mockGroupId}-in-page-1`,
    );
    expect(result).toEqual({ id: 1 });
  });

  it('should throw error when API call fails', async () => {
    const mockError = new Error('Failed to invite member');
    (apiClient.post as jest.Mock).mockRejectedValue(mockError);

    await expect(inviteToGroup(mockGroupId, mockUserId)).rejects.toThrow(
      'Failed to invite member',
    );
  });
});
