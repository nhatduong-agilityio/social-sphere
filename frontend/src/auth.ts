import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Schemas
import { FormSchema } from '@/features/auth/lib';

// Config
import { authConfig } from '@/auth.config';

// Constants
import { API_ENDPOINT } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { IUserResponse } from '@/types';

const CredentialsProvider = Credentials({
  authorize: async (credentials) => {
    const parsedCredentials = FormSchema.safeParse(credentials);

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;

      const payload = {
        identifier: email,
        email,
        password,
      };

      const data = await apiClient.post<IUserResponse>(
        API_ENDPOINT.SIGN_IN,
        JSON.stringify(payload),
      );

      if (data.user) {
        return data.user;
      } else {
        return null;
      }
    }
    return null;
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [CredentialsProvider],
});
