'use server';

import { MOCK_FRIENDS } from '@/__mocks__/user';
import { API_ENDPOINT, QUERY } from '@/constants';
import { apiClient } from '@/services';

// Types
import { UserModel } from '@/models';
import { ApiDataResponse, TFriends, UserDetail } from '@/types';

export const getFriends = async (): Promise<ApiDataResponse<UserDetail[]>> => ({
  data: MOCK_FRIENDS,
});

export const getFriendsByName = async (
  name: string,
): Promise<ApiDataResponse<UserDetail[]>> => {
  const friends = MOCK_FRIENDS.filter(
    (friend) =>
      friend.firstName.toLowerCase().includes(name.toLowerCase()) ||
      friend.lastName.toLowerCase().includes(name.toLowerCase()),
  );
  return { data: friends };
};

export const getFriendsByIds = async (
  friendIds: string[],
): Promise<ApiDataResponse<UserDetail[]>> => {
  const friends = MOCK_FRIENDS.filter((friend) =>
    friendIds.includes(friend.id.toString()),
  );
  return { data: friends };
};

export const getFriendsByUserId = async (
  userId: string,
  searchName?: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<ApiDataResponse<UserModel[]>> => {
  try {
    const query = QUERY.FRIENDS_BY_ID(userId, searchName, page, pageSize);

    const response = await apiClient.get<TFriends>(
      `${API_ENDPOINT.RELATIONSHIP}?${query}`,
      {
        cache: 'no-store',
      },
    );

    const transformApiResponse: UserModel[] = response.data.map((item) => ({
      ...item.followed,
    }));

    return { data: transformApiResponse };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to fetch friends. Please try again.';
    return { error: errorMessage };
  }
};
