import { createContext, ReactNode, useEffect, useMemo, useReducer, useState } from 'react';

// Helpers
import { bindDispatchToAction, ObjActions } from '~/helpers/actionCreator';

// Types
import { IStates } from '~/types/common';
import { IUser } from '~/types/user';

// Stores
import { requestDeleteUser } from '~/store/actions/user/deleteRequest';
import { fetchRequest } from '~/store/actions/user/fetchRequest';
import { requestUpdateUser } from '~/store/actions/user/updateRequest';
import { initUserState, usersReducer } from '~/store/reducers/user';
import { API } from '~/constants/url';
import { fetcher } from '~/services/fetcher';
import useSWR from 'swr';

interface IProps {
  children: ReactNode;
}

export interface IUserContext {
  users: IStates<IUser>;
  handleUpdateUser: (valueUpdate: IUser) => void;
  handleDeleteUser: (id: number) => void;
}

// Create context for management user
export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider: React.FC<IProps> = ({ children }: IProps) => {
  const { data } = useSWR<IUser[]>(API.PATH_USERS, fetcher);

  const [users, dispatchUsers] = useReducer(usersReducer, initUserState);

  const actions = useMemo(
    () =>
      bindDispatchToAction<IUser>(
        { fetchRequest, requestUpdateUser, requestDeleteUser } as ObjActions<IUser>,
        dispatchUsers,
      ),
    [],
  );

  useEffect(() => {
    actions.fetchRequest();
  }, [actions]);

  const handleUpdateUser = (valueUpdate: IUser) => {
    return actions.requestUpdateUser()(valueUpdate);
  };

  const handleDeleteUser = (id: number) => {
    return actions.requestDeleteUser()(id);
  };

  if (!data || !users.data) return <p>Loading...</p>;

  const value = { users, handleUpdateUser, handleDeleteUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
