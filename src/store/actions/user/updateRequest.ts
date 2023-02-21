import { IUser } from '~/types/user';
import { DispatchProps } from '~/types/common';
import { UPDATE_USER } from '~/constants/action';
import { updateStorage } from '~/helpers/localStorage';

export const updateUser = function <Response, Error>(
  onRequest: () => void,
  onSuccess: (response: Response[]) => void,
  onFailure: (error: Error | unknown) => void,
  data: IUser,
) {
  onRequest();

  try {
    const response: Response[] = updateStorage(data);

    onSuccess(response);
  } catch (error: Error | unknown) {
    onFailure(error);
  }
};

export const requestUpdateUser = (dispatch: DispatchProps<IUser>) => (data: IUser) => {
  const onPending = () => {
    return dispatch({ type: UPDATE_USER.PENDING });
  };

  const onSuccess = (response: IUser[]) => {
    return dispatch({ type: UPDATE_USER.SUCCESS, payload: { response } });
  };

  const onFailure = (error: Error | unknown) => {
    return dispatch({ type: UPDATE_USER.FAILURE, payload: { error } });
  };

  return updateUser<IUser, Error>(onPending, onSuccess, onFailure, data);
};
