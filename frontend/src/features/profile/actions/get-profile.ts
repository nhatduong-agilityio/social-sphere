import { notFound } from 'next/navigation';

// Constants
import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { UserDetail } from '@/types';

export const getProfile = async (username: string): Promise<UserDetail> => {
  const url = `${API_ENDPOINT.USERS}?${QUERY.PROFILE(username)}`;

  const profile = await apiClient.get<UserDetail[]>(url, {
    next: { tags: [TAG_KEYS.USER_USERNAME(username)] },
  });

  if (!profile[0]) return notFound();

  return {
    ...profile[0],
    countFriends: profile[0].followedRelationships.length,
  };
};
