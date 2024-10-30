// Auth
import { auth } from '@/auth';

// Constants
import { API_ENDPOINT, ERROR_MESSAGES } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { UserDetail } from '@/types';

export const getProfile = async (): Promise<UserDetail> => {
  try {
    const { user } = (await auth()) ?? {};
    const jwt: string = user?.jwt as string;

    const profile = await apiClient.get<UserDetail>(API_ENDPOINT.PROFILE, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      next: { tags: [API_ENDPOINT.PROFILE] },
    });

    return profile;
  } catch (error) {
    throw ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};
