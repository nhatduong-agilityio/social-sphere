import { MOCK_FRIENDS } from '@/__mocks__/user';

// Types
import { ApiDataResponse } from '@/types/api';
import { UserDetail } from '@/types/user';

export const getFriends = async (): Promise<ApiDataResponse<UserDetail[]>> => {
  try {
    return { data: MOCK_FRIENDS };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to fetch friends. Please try again.';
    return { error: errorMessage };
  }
};

export const getFriendsByName = async (
  name: string,
): Promise<ApiDataResponse<UserDetail[]>> => {
  try {
    const friends = MOCK_FRIENDS.filter(
      (friend) =>
        friend.firstName.toLowerCase().includes(name.toLowerCase()) ||
        friend.lastName.toLowerCase().includes(name.toLowerCase()),
    );
    return { data: friends };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to fetch friends. Please try again.';
    return { error: errorMessage };
  }
};
