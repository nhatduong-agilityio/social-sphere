'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

// Auth
import { signIn, signOut } from '@/auth';

// Constants
import { ROUTER } from '@/constants/router';
import { AUTH_ERROR_TYPES } from '@/constants/auth';
import { ERROR_MESSAGES } from '@/constants/message';

const login = async (_: string | undefined, user: FormData) => {
  try {
    await signIn('credentials', user);

    redirect(ROUTER.HOME);
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMessages: { [key: string]: string } = {
        [AUTH_ERROR_TYPES.CREDENTIALS_SIGN_IN]:
          ERROR_MESSAGES.EMAIL_PASSWORD_INVALID,
      };
      return errorMessages[error.type] || ERROR_MESSAGES.UNKNOWN_ERROR;
    }
    throw error;
  }
};

const logout = async () => {
  await signOut();
};

export { login, logout };
