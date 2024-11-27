import { MOCK_FRIENDS } from '@/__mocks__/user';
import {
  getFriends,
  getFriendsByName,
  getFriendsByIds,
  getFriendsByUserId,
} from '../get-friends';
import { apiClient } from '@/services/api';

jest.mock('@/services/api');

describe('Friends Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFriends', () => {
    it('should return mock friends data successfully', async () => {
      const result = await getFriends();
      expect(result).toEqual({ data: MOCK_FRIENDS });
    });
  });

  describe('getFriendsByName', () => {
    it('should filter friends by first name', async () => {
      const searchName = MOCK_FRIENDS[0].firstName;
      const result = await getFriendsByName(searchName);

      expect(result.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            firstName: expect.stringContaining(searchName),
          }),
        ]),
      );
    });

    it('should filter friends by last name', async () => {
      const searchName = MOCK_FRIENDS[0].lastName;
      const result = await getFriendsByName(searchName);

      expect(result.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            lastName: expect.stringContaining(searchName),
          }),
        ]),
      );
    });

    it('should return empty array when no matches found', async () => {
      const result = await getFriendsByName('NonExistentName');
      expect(result.data).toEqual([]);
    });
  });

  describe('getFriendsByIds', () => {
    it('should return friends matching the provided ids', async () => {
      const friendIds = [MOCK_FRIENDS[0].id.toString()];
      const result = await getFriendsByIds(friendIds);

      expect(result.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: parseInt(friendIds[0]) }),
        ]),
      );
    });

    it('should return empty array when no matching ids found', async () => {
      const result = await getFriendsByIds(['999999']);
      expect(result.data).toEqual([]);
    });
  });

  describe('getFriendsByUserId', () => {
    const userId = '123';
    const mockApiResponse = {
      data: [
        { followed: { id: 1, name: 'Test User' } },
        { followed: { id: 2, name: 'Test User 2' } },
      ],
    };

    it('should fetch and transform friends data by user id', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await getFriendsByUserId(userId);

      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining(`/relationship`),
        expect.any(Object),
      );
      expect(result.data).toEqual([
        { id: 1, name: 'Test User' },
        { id: 2, name: 'Test User 2' },
      ]);
    });

    it('should handle API errors', async () => {
      const mockError = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      const result = await getFriendsByUserId(userId);

      expect(result).toEqual({
        error: 'API Error',
      });
    });

    it('should handle errors without message', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue({});

      const result = await getFriendsByUserId(userId);

      expect(result).toEqual({
        error: 'Failed to fetch friends. Please try again.',
      });
    });
  });
});
