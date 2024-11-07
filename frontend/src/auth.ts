import NextAuth, { DefaultSession } from 'next-auth';
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
import { IUserResponse, TAuthResponse } from '@/types';

declare module 'next-auth' {
  interface Session {
    user: IUserResponse & DefaultSession['user'];
  }
}

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

      const data = await apiClient.post<TAuthResponse>({
        path: API_ENDPOINT.SIGN_IN,
        body: JSON.stringify(payload),
      });
      const { user, jwt } = data;

      if (!user) return null;

      return { ...user, id: user.id.toString(), jwt };
    }
    return null;
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [CredentialsProvider],
});
