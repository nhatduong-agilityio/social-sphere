import { notFound, redirect } from 'next/navigation';

// Auth
import { auth } from '@/auth';

// Constants
import { API_ENDPOINT, ROUTER, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { UserDetail } from '@/types';

export const getProfile = async (userId?: string): Promise<UserDetail> => {
  const { user } = (await auth()) ?? {};
  const jwt: string = user?.jwt as string;
  const id = userId ?? user?.id;
  const url = `${API_ENDPOINT.USERS}/${id}`;

  if (!jwt) return redirect(ROUTER.LOGIN);

  const profile = await apiClient.get<UserDetail>(url, {
    headers: { Authorization: `Bearer ${jwt}` },
    next: { tags: [TAG_KEYS.USER_ID(id)] },
  });

  if (!profile) return notFound();

  return profile;
};
