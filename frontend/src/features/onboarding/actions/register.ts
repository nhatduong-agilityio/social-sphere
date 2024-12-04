'use server';

// Auth
import { signIn } from '@/auth';

// Constants
import { AUTH_METHOD, API_ENDPOINT, ERROR_MESSAGES } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { IUserRequest, UserDetail } from '@/types';

const checkEmailExists = async (email: string) => {
  try {
    const url = `${API_ENDPOINT.USERS}?filters[email][$eq]=${email}`;

    const response = await apiClient.get<UserDetail[]>(url, {
      cache: 'no-store',
      headers: {},
    });

    return !!response.length && { exists: !!response.length };
  } catch (error) {
    return { error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};

const register = async (data: IUserRequest) => {
  let errorOccurred = false;

  try {
    const payload = {
      ...data,
      username: data.email,
    };

    await apiClient.post<IUserRequest>({
      path: API_ENDPOINT.SIGN_UP,
      body: JSON.stringify(payload),
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
