'use server';

// Auth
import { signIn } from '@/auth';

// Constants
import { AUTH_METHOD, API_ENDPOINT, ERROR_MESSAGES } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { IUserRequest, IUserResponse } from '@/types';

const checkEmailExists = async (email: string) => {
  try {
    const url = `${API_ENDPOINT.USERS}?filters[email][$eq]=${email}`;

    const response = await apiClient.get<IUserResponse>(url, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      cache: 'no-store',
    });

    const isEmailExists = response.data.length > 0;
    return isEmailExists;
  } catch (error) {
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

const register = async (data: IUserRequest) => {
  let errorOccurred = false;

  try {
    await apiClient.post<IUserRequest>(API_ENDPOINT.USERS, {
      data: { ...data },
    });
  } catch (error) {
    errorOccurred = true;
    return { error: ERROR_MESSAGES.UNKNOWN_ERROR };
  } finally {
    if (!errorOccurred) {
      await signIn(AUTH_METHOD.CREDENTIALS, {
        email: data.email,
        password: data.password,
        redirect: false,
      });
    }
  }
};

export { register, checkEmailExists };
