import {
  createContext,
  ReactNode,
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { bindDispatchToAction, ObjActions } from '~/helpers/actionCreator';
import { IStates } from '~/types/common';
import { IUser } from '~/types/user';
import { requestDeleteUser } from '../actions/deleteRequest';
import { fetchRequest } from '../actions/fetchRequest';
import { requestUpdateUser } from '../actions/updateRequest';
import { initUserState, usersReducer } from '../reducers/user';

interface IProps {
  children: ReactNode;
}

export interface IUserContext {
  users: IStates<IUser>;
  handleRefreshData: () => void;
  handleUpdateUser: (valueUpdate: IUser) => void;
  handleDeleteUser: (id: number) => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider: React.FC<IProps> = ({ children }: IProps) => {
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

  const handleRefreshData = async () => {
    return await actions.fetchRequest();
  };

  const handleUpdateUser = async (valueUpdate: IUser) => {
    return await actions.requestUpdateUser()(valueUpdate);
  };

  const handleDeleteUser = async (id: number) => {
    return await actions.requestDeleteUser()(id);
  };

  const value = { users, handleRefreshData, handleUpdateUser, handleDeleteUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
