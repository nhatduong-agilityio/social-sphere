import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

// Constants
import {
  AUTH_METHOD,
  AUTH_ERROR_TYPES,
  ERROR_MESSAGES,
  ROUTER,
} from '@/constants';

// Auths
import { signIn, signOut } from '@/auth';

// Actions
import { login, logout } from '../login';

jest.mock('@/auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('auth-service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should redirect to the home page on successful login', async () => {
      (signIn as jest.Mock).mockResolvedValueOnce(undefined); // Simulate successful login

      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'password');

      const result = await login(undefined, formData);

      expect(signIn).toHaveBeenCalledWith(AUTH_METHOD.CREDENTIALS, formData);
      expect(redirect).toHaveBeenCalledWith(ROUTER.HOME);
      expect(result).toBeUndefined(); // No error message on success
    });

    it('should return an error message for invalid credentials', async () => {
      (signIn as jest.Mock).mockRejectedValueOnce(
        new AuthError(AUTH_ERROR_TYPES.CREDENTIALS_SIGN_IN),
      );

      const formData = new FormData();
      formData.append('email', 'invalid@example.com');
      formData.append('password', 'wrongpassword');

      const result = await login(undefined, formData);

      expect(signIn).toHaveBeenCalledWith(AUTH_METHOD.CREDENTIALS, formData);
      expect(result).toBe(ERROR_MESSAGES.EMAIL_PASSWORD_INVALID);
      expect(redirect).not.toHaveBeenCalled();
    });

    it('should return an error message for callback route error', async () => {
      (signIn as jest.Mock).mockRejectedValueOnce(
        new AuthError(AUTH_ERROR_TYPES.CALLBACK_ROUTE_ERROR),
      );

      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'password');

      const result = await login(undefined, formData);

      expect(result).toBe(ERROR_MESSAGES.EMAIL_PASSWORD_INVALID);
      expect(redirect).not.toHaveBeenCalled();
    });

    it('should return an unknown error message for other AuthError types', async () => {
      (signIn as jest.Mock).mockRejectedValueOnce(
        new AuthError('UNKNOWN_ERROR_TYPE'),
      );

      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'password');

      const result = await login(undefined, formData);

      expect(result).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
      expect(redirect).not.toHaveBeenCalled();
    });

    it('should rethrow non-AuthError exceptions', async () => {
      const error = new Error('Unexpected Error');
      (signIn as jest.Mock).mockRejectedValueOnce(error);

      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'password');

      await expect(login(undefined, formData)).rejects.toThrow(
        'Unexpected Error',
      );
    });
  });

  describe('logout', () => {
    it('should call signOut with the correct parameters', async () => {
      await logout();

      expect(signOut).toHaveBeenCalledWith({
        redirect: true,
        redirectTo: ROUTER.LOGIN,
      });
    });
  });
});
