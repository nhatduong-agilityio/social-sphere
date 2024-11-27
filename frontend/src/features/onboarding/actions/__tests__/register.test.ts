// Auths
import { signIn } from '@/auth';

// Services
import { apiClient } from '@/services';

// Types
import { IUserRequest } from '@/types';

// Actions
import { register, checkEmailExists } from '../register';

// Constants
import { AUTH_METHOD, API_ENDPOINT, ERROR_MESSAGES } from '@/constants';

jest.mock('@/services', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock('@/auth', () => ({
  signIn: jest.fn(),
}));

describe('auth-service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkEmailExists', () => {
    it('should return true if the email exists', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce([
        { id: 1, email: 'test@example.com' },
      ]);

      const result = await checkEmailExists('test@example.com');

      expect(apiClient.get).toHaveBeenCalledWith(
        `${API_ENDPOINT.USERS}?filters[email][$eq]=test@example.com`,
        {
          cache: 'no-store',
          headers: {},
        },
      );
      expect(result).toBe(true);
    });

    it('should return false if the email does not exist', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce([]);

      const result = await checkEmailExists('nonexistent@example.com');

      expect(result).toBe(false);
    });

    it('should return an error message if the API call fails', async () => {
      (apiClient.get as jest.Mock).mockRejectedValueOnce(
        new Error('Network Error'),
      );

      const result = await checkEmailExists('error@example.com');

      expect(result).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
    });
  });

  describe('register', () => {
    it('should register a new user and sign them in successfully', async () => {
      const mockUser: IUserRequest = {
        email: 'test@example.com',
        password: 'password123',
        firstName: '',
        lastName: '',
        username: '',
      };

      (apiClient.post as jest.Mock).mockResolvedValueOnce({});
      (signIn as jest.Mock).mockResolvedValueOnce({});

      await register(mockUser);

      expect(apiClient.post).toHaveBeenCalledWith({
        path: API_ENDPOINT.SIGN_UP,
        body: JSON.stringify({
          ...mockUser,
          username: mockUser.email,
        }),
      });
      expect(signIn).toHaveBeenCalledWith(AUTH_METHOD.CREDENTIALS, {
        email: mockUser.email,
        password: mockUser.password,
        redirect: false,
      });
    });

    it('should return an error message if registration fails', async () => {
      const mockUser: IUserRequest = {
        email: 'test@example.com',
        password: 'password123',
        firstName: '',
        lastName: '',
        username: '',
      };

      (apiClient.post as jest.Mock).mockRejectedValueOnce(
        new Error('Registration Error'),
      );

      const result = await register(mockUser);

      expect(apiClient.post).toHaveBeenCalledWith({
        path: API_ENDPOINT.SIGN_UP,
        body: JSON.stringify({
          ...mockUser,
          username: mockUser.email,
        }),
      });
      expect(result).toEqual({ error: ERROR_MESSAGES.UNKNOWN_ERROR });
      expect(signIn).not.toHaveBeenCalled();
    });
  });
});
