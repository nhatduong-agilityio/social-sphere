import { URL } from '~/constant/urls';
import { client } from '~/service';
import { AxiosResponse, AxiosError } from 'axios';
import { DispatchProps } from '~/types/common';
import { IUser } from '~/types/user';
import { DELETE_USER } from '~/constant/action';

const deleteUserApi = async (idUser: number) => {
  return await client.delete(`${URL.API_BASE_USERS}/${idUser}`);
};

const deleteUser = async function <Response, Error>(
  onRequest: () => void,
  onSuccess: (response: AxiosResponse<Response>) => void,
  onFailure: (error: AxiosError<Error> | unknown) => void,
  idUser: number,
) {
  onRequest();

  try {
    const response: AxiosResponse<Response> = await deleteUserApi(idUser);

    onSuccess(response);
  } catch (error: AxiosError<Error> | unknown) {
    onFailure(error);
  }
};

export const requestDeleteUser = (dispatch: DispatchProps<IUser>) => (idUser: number) => {
  const onPending = () => {
    return dispatch({ type: DELETE_USER.PENDING });
  };

  const onSuccess = (response: AxiosResponse<IUser>) => {
    return dispatch({ type: DELETE_USER.SUCCESS, payload: { response, id: idUser } });
  };

  const onFailure = (error: AxiosError<Error> | unknown) => {
    return dispatch({ type: DELETE_USER.FAILURE, payload: { error } });
  };

  return deleteUser<IUser, Error>(onPending, onSuccess, onFailure, idUser);
};
