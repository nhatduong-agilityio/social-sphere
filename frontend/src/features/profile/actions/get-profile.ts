import { notFound, redirect } from 'next/navigation';

// Auth
import { auth } from '@/auth';

// Constants
import { API_ENDPOINT, ROUTER } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { UserDetail } from '@/types';

export const getProfile = async (): Promise<UserDetail> => {
  const { user } = (await auth()) ?? {};
  const jwt: string = user?.jwt as string;

  if (!jwt) return redirect(ROUTER.LOGIN);

  const profile = await apiClient.get<UserDetail>(API_ENDPOINT.PROFILE, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    next: { tags: [API_ENDPOINT.PROFILE] },
  });

  if (!profile) return notFound();

  return profile;
};
