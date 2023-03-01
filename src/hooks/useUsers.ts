// Libs
import useSWR from 'swr';

// Service
import { fetcher } from '~/services/read';

// Constant
import { API } from '~/constants/url';

// Types
import { IUser } from '~/types/user';

export const useUsers = () => {
  const { data, error, mutate } = useSWR<IUser[]>(API.PATH_USERS, fetcher);

  return { users: data, error, isLoading: !error && !data, mutate };
};
