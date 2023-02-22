// Types
import { IUser } from '~/types/user';
import { DispatchProps } from '~/types/common';

// Constants
import { UPDATE_USER } from '~/constants/action';

// Helpers
import { updateStorage } from '~/helpers/localStorage';

/**
 * Handle update data and return response to void params
 * @param onRequest void
 * @param onSuccess void
 * @param onFailure void
 */
export const updateUser = function <Response, Error>(
  onRequest: () => void,
  onSuccess: (response: Response[]) => void,
  onFailure: (error: Error | unknown) => void,
  data: IUser,
) {
  onRequest();

  try {
    // Call to function helper for update data
    const response: Response[] = updateStorage(data);

    onSuccess(response);
  } catch (error: Error | unknown) {
    onFailure(error);
  }
};

/**
 * Handle request update data from action
 * @param dispatch dispatch props
 * @returns call to function update data and return response to reducer
 */
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
