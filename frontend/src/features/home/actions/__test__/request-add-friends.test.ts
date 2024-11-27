import {
  requestAddFriends,
  acceptedFriend,
  rejectedFriend,
} from '../request-add-friends';
import { apiClient } from '@/services/api';
import { revalidateTag } from 'next/cache';

jest.mock('@/services/api');
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('Friend Request Actions', () => {
  const authorId = '123';
  const userId = '456';
  const relationshipId = '789';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('requestAddFriends', () => {
    it('should create new friend request when no existing request', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: [] });

      await requestAddFriends(authorId, userId);

      expect(apiClient.post).toHaveBeenCalledWith({
        path: expect.stringContaining('api/relationships'),
        body: JSON.stringify({
          data: {
            follower: Number(authorId),
            followed: Number(userId),
            requestStatus: 'pending',
          },
        }),
      });
    });

    it('should update existing rejected request to pending', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: [{ documentId: 'reject123' }],
      });

      await requestAddFriends(authorId, userId);

      expect(apiClient.put).toHaveBeenCalledWith(
        expect.stringContaining('api/relationships/reject123'),
        JSON.stringify({ data: { requestStatus: 'pending' } }),
      );
    });

    it('should handle API errors with custom message', async () => {
      const mockError = new Error('Custom API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      const result = await requestAddFriends(authorId, userId);

      expect(result).toEqual({
        error: 'Custom API Error',
      });
    });

    it('should handle API errors without message', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue({});

      const result = await requestAddFriends(authorId, userId);

      expect(result).toEqual({
        error: 'Failed to request add friends. Please try again.',
      });
    });
  });

  describe('acceptedFriend', () => {
    it('should accept friend request successfully', async () => {
      await acceptedFriend(authorId, userId, relationshipId);

      expect(apiClient.post).toHaveBeenCalled();
      expect(apiClient.put).toHaveBeenCalled();
      expect(revalidateTag).toHaveBeenCalledWith(
        `api-accept-friends-${authorId}`,
      );
    });

    it('should handle API errors with custom message', async () => {
      const mockError = new Error('Custom API Error');
      (apiClient.post as jest.Mock).mockRejectedValue(mockError);

      const result = await acceptedFriend(authorId, userId, relationshipId);

      expect(result).toEqual({
        error: 'Custom API Error',
      });
    });

    it('should handle API errors without message', async () => {
      (apiClient.post as jest.Mock).mockRejectedValue({});

      const result = await acceptedFriend(authorId, userId, relationshipId);

      expect(result).toEqual({
        error: 'Failed to request add friends. Please try again.',
      });
    });
  });

  describe('rejectedFriend', () => {
    it('should reject friend request successfully', async () => {
      await rejectedFriend(relationshipId, authorId);

      expect(apiClient.put).toHaveBeenCalledWith(
        expect.stringContaining(`api/relationships/${relationshipId}`),
        JSON.stringify({ data: { requestStatus: 'rejected' } }),
      );
      expect(revalidateTag).toHaveBeenCalledWith(
        `api-accept-friends-${authorId}`,
      );
    });

    it('should handle API errors with custom message', async () => {
      const mockError = new Error('Custom API Error');
      (apiClient.put as jest.Mock).mockRejectedValue(mockError);

      const result = await rejectedFriend(relationshipId, authorId);

      expect(result).toEqual({
        error: 'Custom API Error',
      });
    });

    it('should handle API errors without message', async () => {
      (apiClient.put as jest.Mock).mockRejectedValue({});

      const result = await rejectedFriend(relationshipId, authorId);

      expect(result).toEqual({
        error: 'Failed to rejected friend. Please try again.',
      });
    });
  });
});
