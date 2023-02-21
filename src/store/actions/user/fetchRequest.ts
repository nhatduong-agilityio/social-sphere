import { DispatchProps } from '~/types/common';
import { IUser } from '~/types/user';
import { FETCH_USERS } from '~/constants/action';
import { readFromCache } from '~/services/cache';
import customers from '~/store/data';

/**
 * async function handle return response and error for get users.
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

    const response = verifyCache !== undefined ? readFromCache('users') : customers;

    onSuccess(response);
  } catch (error: Error | unknown) {
    onFailure(error);
  }
};

/**
 * function handle request get users and connect to provider.
 * handle action and payload with function action request.
 * @param dispatch DispatchProps<ICheckedInfo>
 * @returns call to function handle return response and error for get users with generic type.
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
