import { DispatchProps } from '~/types/common';
import { IUser } from '~/types/user';
import { DELETE_USER } from '~/constants/action';
import { removeStorage } from '~/helpers/localStorage';

const deleteUser = function <Response, Error>(
  onRequest: () => void,
  onSuccess: (response: Response[]) => void,
  onFailure: (error: Error | unknown) => void,
  idUser: number,
) {
  onRequest();

  try {
    const response: Response[] = removeStorage(idUser);

    onSuccess(response);
  } catch (error: Error | unknown) {
    onFailure(error);
  }
};

export const requestDeleteUser = (dispatch: DispatchProps<IUser>) => (idUser: number) => {
  const onPending = () => {
    return dispatch({ type: DELETE_USER.PENDING });
  };

  const onSuccess = (response: IUser[]) => {
    return dispatch({ type: DELETE_USER.SUCCESS, payload: { response } });
  };

  const onFailure = (error: Error | unknown) => {
    return dispatch({ type: DELETE_USER.FAILURE, payload: { error } });
  };

  return deleteUser<IUser, Error>(onPending, onSuccess, onFailure, idUser);
};
