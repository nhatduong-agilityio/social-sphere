// Libs
import useSWR from 'swr';

// Service
import { request } from '~/services/request';

// Constant
import { API } from '~/constants/url';

// Types
import { IUser } from '~/types/user';

export const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<IUser[]>(API.PATH_USERS, request.fetcher);

  const updating = (value: IUser) => {
    request.update<IUser>(API.PATH_USERS + `/${value.id}`, { arg: value });

    const dataUpdate = data?.map((user) => {
      if (user.id === value.id) {
        return value;
      } else {
        return user;
      }
    });

    mutate(dataUpdate, false);
  };

  const deleting = (id: number) => {
    request.delete(API.PATH_USERS + `/${id}`);

    const dataUpdate = data?.filter((user) => user.id !== id);

    mutate(dataUpdate, false);
  };

  return { users: data, error, isLoading, mutate, updating, deleting };
};
