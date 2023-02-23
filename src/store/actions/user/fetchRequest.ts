// Types
import { DispatchProps } from '~/types/common';
import { IUser } from '~/types/user';

// Constants
import { FETCH_USERS } from '~/constants/action';

// Services
import { readFromCache } from '~/services/cache';

// Store
import customers from '~/store/data';

/**
 * Handle fetch data and return response to void params
 * @param onRequest void
 * @param onSuccess void
 * @param onFailure void
 */
export const fetchUsers = function <Response, Error>(
  onRequest: () => void,
  onSuccess: (response: Response[]) => void,
  onFailure: (error: Error | unknown) => void,
) {
  onRequest();

  try {
    const verifyCache = readFromCache('users').value;

    // Check data in local storage
    const response = verifyCache !== undefined ? readFromCache('users') : customers;

    onSuccess(response);
  } catch (error: Error | unknown) {
    onFailure(error);
  }
};

/**
 * Handle request fetch data from action
 * @param dispatch dispatch props
 * @returns call to function fetch data and return response to reducer
 */
export const fetchRequest = (dispatch: DispatchProps<IUser>) => {
  const onPending = () => {
    return dispatch({ type: FETCH_USERS.PENDING });
  };

  const onSuccess = (response: IUser[]) => {
    return dispatch({
      type: FETCH_USERS.SUCCESS,
      payload: { response },
    });
  };

  const onFailure = (error: Error | unknown) => {
    return dispatch({ type: FETCH_USERS.FAILURE, payload: { error } });
  };

  return fetchUsers<IUser, Error>(onPending, onSuccess, onFailure);
};
