'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

// Auth
import { signIn, signOut } from '@/auth';

// Constants
import {
  ROUTER,
  AUTH_ERROR_TYPES,
  AUTH_METHOD,
  ERROR_MESSAGES,
} from '@/constants';

const login = async (_: string | undefined, user: FormData) => {
  let errorOccurred = false;

  try {
    await signIn(AUTH_METHOD.CREDENTIALS, user);
  } catch (error) {
    if (error instanceof AuthError) {
      errorOccurred = true;

      switch (error.type) {
        case AUTH_ERROR_TYPES.CREDENTIALS_SIGN_IN:
          return ERROR_MESSAGES.EMAIL_PASSWORD_INVALID;
        default:
          return ERROR_MESSAGES.UNKNOWN_ERROR;
      }
    }

    throw error;
  } finally {
    if (!errorOccurred) {
      redirect(ROUTER.HOME);
    }
  }
};

const logout = async () => {
  await signOut();
};

export { login, logout };
