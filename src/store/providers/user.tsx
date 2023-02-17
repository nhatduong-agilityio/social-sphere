import { createContext, ReactNode, useCallback, useEffect, useMemo, useReducer } from 'react';
import { bindDispatchToAction, ObjActions } from '~/helpers/actionCreator';
import { IStates } from '~/types/common';
import { IUser } from '~/types/user';
import { fetchRequest } from '../actions/fetchRequest';
import { initUserState, usersReducer } from '../reducers/user';

interface IProps {
  children: ReactNode;
}

export interface IUserContext {
  users: IStates<IUser>;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [users, dispatchUsers] = useReducer(usersReducer, initUserState);

  const actions = useMemo(
    () => bindDispatchToAction<IUser>({ fetchRequest } as ObjActions<IUser>, dispatchUsers),
    [],
  );

  const verifyFetchRequest = useMemo(() => {
    users;
  }, [users]);

  useEffect(() => {
    actions.fetchRequest();
  }, [actions, verifyFetchRequest]);

  const value = useMemo(
    () => ({
      users,
    }),
    [users],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
