// Libs
import useSWR from 'swr';

// Service
import { fetcher } from '~/services/read';

// Constant
import { API } from '~/constants/url';

// Types
import { IUser } from '~/types/user';

export const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<IUser[]>(API.PATH_USERS, fetcher);

  return { users: data, error, isLoading, mutate };
};
