import type { NextAuthConfig, Session } from 'next-auth';

// Constants
import { ROUTER } from '@/constants/router';

const isAuthorized = (auth: Session | null, nextUrl: URL) => {
  const isLoggedIn = !!auth?.user;
  const isSignInPage = nextUrl.pathname === ROUTER.LOGIN;

  if (isLoggedIn && isSignInPage) {
    return Response.redirect(new URL(ROUTER.HOME, nextUrl));
  }

  if (!isLoggedIn && !isSignInPage) {
    return Response.redirect(new URL(ROUTER.LOGIN, nextUrl));
  }

  return true;
};

export const authConfig = {
  pages: {
    signIn: ROUTER.LOGIN,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return isAuthorized(auth, nextUrl);
    },
    jwt: async ({ user, token }) => {
      if (token) Object.assign(token, user);

      return token;
    },
    session: ({ session, token }) => {
      Object.assign(session.user, token);

      return session;
    },
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  trustHost: true,
  providers: [],
} satisfies NextAuthConfig;
