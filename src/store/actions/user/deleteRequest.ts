// Types
import { DispatchProps } from '~/types/common';
import { IUser } from '~/types/user';

// Constants
import { DELETE_USER } from '~/constants/action';

// Helpers
import { removeStorage } from '~/helpers/localStorage';

/**
 * Handle delete data and pass response to void params
 * @param onRequest void
 * @param onSuccess void
 * @param onFailure void
 * @param idUser number
 */
const deleteUser = function <Response, Error>(
  onRequest: () => void,
  onSuccess: (response: Response[]) => void,
  onFailure: (error: Error | unknown) => void,
  idUser: number,
) {
  onRequest();

  try {
    // Call to helper remove data by id
    const response: Response[] = removeStorage(idUser);

    onSuccess(response);
  } catch (error: Error | unknown) {
    onFailure(error);
  }
};

/**
 * Handle request delete data from action
 * @param dispatch dispatch props
 * @returns function handle delete and pass response to reducer
 */
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
