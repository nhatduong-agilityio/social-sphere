import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Schemas
import { FormSchema } from '@/features/auth/lib/schema';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__/user';

// Config
import { authConfig } from '@/auth.config';

const CredentialsProvider = Credentials({
  authorize: async (credentials) => {
    const parsedCredentials = FormSchema.safeParse(credentials);

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;

      const user = MOCK_FRIENDS.find(
        (friend) => friend.email === email && friend.password === password,
      );

      if (user) {
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
