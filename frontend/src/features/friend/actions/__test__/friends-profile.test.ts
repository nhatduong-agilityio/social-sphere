// Services
import { apiClient } from '@/services';

// Types
import { TFriends } from '@/types';

// Actions
import {
  getAcceptFriendListByUserId,
  getFriendListByUsername,
  getNonFriendListByUserId,
} from '../friends-profile';

// Models
import { TFollowed } from '@/models';

jest.mock('@/services', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe('Friendship Services', () => {
  const username = 'testuser';
  const userId = '123';
  const mockFriendsResponse: TFriends = {
    data: [
      {
        id: 1,
        followed: {
          id: 2,
          username: 'friend1',
          firstName: 'John',
          lastName: 'Doe',
          followedRelationships: [{ id: 10 }, { id: 11 }],
        },
        documentId: '',
        follower: {
          id: 3,
          username: 'friend2',
          firstName: 'Jane',
          lastName: 'Doe',
          followedRelationships: [{ id: 10 }, { id: 11 }],
        },
      },
    ],
  };

  const mockNonFriendsResponse: TFollowed[] = [
    {
      id: 3,
      username: 'suggested1',
      countFriends: 1,
      firstName: 'John',
      lastName: 'Doe',
      followedRelationships: [{ id: 12 }],
    },
    {
      id: 4,
      username: 'suggested2',
      countFriends: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      followedRelationships: [],
    },
  ];

  const mockAcceptFriendsResponse: TFriends = {
    data: [
      {
        id: 5,
        follower: {
          id: 6,
          username: 'accept1',
          firstName: 'John',
          lastName: 'Doe',
          followedRelationships: [{ id: 13 }],
        },
        documentId: '',
        followed: {
          id: 7,
          username: 'accept2',
          firstName: 'Jane',
          lastName: 'Doe',
          followedRelationships: [{ id: 13 }],
        },
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the friend list by username', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue(mockFriendsResponse);

    const result = await getFriendListByUsername(username);

    expect(apiClient.get).toHaveBeenCalled();

    expect(result).toEqual([
      {
        id: 1,
        followed: {
          id: 2,
          username: 'friend1',
          firstName: 'John',
          lastName: 'Doe',
          countFriends: 2,
          followedRelationships: [{ id: 10 }, { id: 11 }],
        },
      },
    ]);
  });

  it('should fetch the non-friend list by user ID', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue(mockNonFriendsResponse);

    const result = await getNonFriendListByUserId(userId);

    expect(apiClient.get).toHaveBeenCalled();

    expect(result).toEqual([
      {
        id: 3,
        username: 'suggested1',
        firstName: 'John',
        lastName: 'Doe',
        countFriends: 1,
        followedRelationships: [{ id: 12 }],
      },
      {
        id: 4,
        username: 'suggested2',
        firstName: 'Jane',
        lastName: 'Doe',
        countFriends: 0,
        followedRelationships: [],
      },
    ]);
  });

  it('should fetch the accept-friend list by user ID', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue(mockAcceptFriendsResponse);

    const result = await getAcceptFriendListByUserId(userId);

    expect(apiClient.get).toHaveBeenCalled();
    expect(result).toEqual([
      {
        id: 5,
        countFriends: 1,
        follower: {
          id: 6,
          username: 'accept1',
          firstName: 'John',
          lastName: 'Doe',
          followedRelationships: [{ id: 13 }],
        },
        documentId: '',
        followed: {
          id: 7,
          username: 'accept2',
          firstName: 'Jane',
          lastName: 'Doe',
          followedRelationships: [{ id: 13 }],
        },
      },
    ]);
  });

  it('should handle errors when fetching friend lists', async () => {
    const errorMessage = 'Network Error';
    (apiClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getFriendListByUsername(username)).rejects.toThrow(
      errorMessage,
    );
    await expect(getNonFriendListByUserId(userId)).rejects.toThrow(
      errorMessage,
    );
    await expect(getAcceptFriendListByUserId(userId)).rejects.toThrow(
      errorMessage,
    );
  });
});
