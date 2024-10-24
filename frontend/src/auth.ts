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

      const url = `${API_ENDPOINT.USERS}?filters[email][$eq]=${email}&?filters[password][$eq]=${password}`;

      const users = await apiClient.get<IUserResponse>(url, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        cache: 'no-store',
      });

      if (users.data.length > 0) {
        const user = users.data[0];
        return user;
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
