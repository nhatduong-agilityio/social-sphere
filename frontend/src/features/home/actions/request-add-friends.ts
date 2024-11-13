'use server';

// Services
import { apiClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

export const requestAddFriends = async (authorId: string, userId: string) => {
  try {
    const payload = {
      data: {
        follower: Number(authorId),
        followed: Number(userId),
        requestStatus: 'pending',
      },
    };

    await apiClient.post({
      path: API_ENDPOINT.RELATIONSHIP,
      body: JSON.stringify(payload),
    });
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to request add friends. Please try again.';
    return { error: errorMessage };
  }
};
