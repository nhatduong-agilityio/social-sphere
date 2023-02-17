import { IUser } from '~/types/user';
import { AxiosResponse, AxiosError } from 'axios';
import { DispatchProps } from '~/types/common';
import { FETCH_USERS, UPDATE_USER } from '~/constant/action';
import { updateUserService } from '~/service/update';
import { URL } from '~/constant/urls';

export const updateUserApi = async (data: IUser) => {
  return await updateUserService(URL.API_BASE_USERS, data);
};

export const updateUser = async function <Response, Error>(
  onRequest: () => void,
  onSuccess: (response: AxiosResponse<Response>) => void,
  onFailure: (error: AxiosError<Error> | unknown) => void,
  data: IUser,
) {
  onRequest();

  try {
    const response: AxiosResponse<Response> = await updateUserApi(data);

    onSuccess(response);
  } catch (error: AxiosError<Error> | unknown) {
    onFailure(error);
  }
};

export const requestUpdateUser = (dispatch: DispatchProps<IUser>) => (data: IUser) => {
  const onPending = () => {
    return dispatch({ type: UPDATE_USER.PENDING });
  };

  const onSuccess = (response: AxiosResponse) => {
    return dispatch({ type: UPDATE_USER.SUCCESS, payload: { response } });
  };

  const onFailure = (error: AxiosError<Error> | unknown) => {
    return dispatch({ type: UPDATE_USER.FAILURE, payload: { error } });
  };

  return updateUser<IUser, Error>(onPending, onSuccess, onFailure, data);
};
