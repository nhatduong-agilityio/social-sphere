import { URL } from '~/constant/urls';
import { client } from '~/helpers/service';
import { AxiosResponse, AxiosError } from 'axios';
import { DispatchProps } from '~/types/common';
import { IUser } from '~/types/user';
import { FETCH_USERS } from '~/constant/action';

const fetchApi = async () => {
  return await client.get(URL.API_BASE_USERS);
};

/**
 * async function handle return response and error for get users.
 * @param onRequest void
 * @param onSuccess void
 * @param onFailure void
 */
export const fetchUsers = async function <Response, Error>(
  onRequest: () => void,
  onSuccess: (response: AxiosResponse<Response[]>) => void,
  onFailure: (error: AxiosError<Error> | unknown) => void,
) {
  onRequest();

  try {
    const response: AxiosResponse<Response[]> = await fetchApi();

    onSuccess(response);
  } catch (error: AxiosError<Error> | unknown) {
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

  const onSuccess = (response: AxiosResponse<IUser[]>) => {
    return dispatch({ type: FETCH_USERS.SUCCESS, payload: { response } });
  };

  const onFailure = (error: AxiosError<Error> | unknown) => {
    return dispatch({ type: FETCH_USERS.FAILURE, payload: { error } });
  };

  return fetchUsers<IUser, Error>(onPending, onSuccess, onFailure);
};
