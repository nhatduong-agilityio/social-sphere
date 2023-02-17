import { DispatchProps } from '~/types/common';
import { IUser } from '~/types/user';

export interface ObjActions<T> {
  fetch?: (dispatch: DispatchProps<IUser>) => Promise<void>;
  update?: (dispatch: DispatchProps<IUser>) => (valueUpdate: T) => Promise<void>;
  delete?: (dispatch: DispatchProps<IUser>) => (users: IUser[], idUser: number) => Promise<void>;
}

export const bindDispatchToAction = function <T>(
  actions: ObjActions<T>,
  dispatch: DispatchProps<IUser>,
) {
  return Object.fromEntries(
    Object.entries(actions).map(([key, action]) => [
      key,
      () => {
        return action(dispatch);
      },
    ]),
  );
};
