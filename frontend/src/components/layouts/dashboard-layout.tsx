import { ReactNode } from 'react';

// Components
import { Header } from './header';

// Auth
import { auth } from '@/auth';

// Types
import { UserDetail } from '@/types';

export const DashboardLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = (await auth()) ?? {};

  return (
    <main className="min-h-screen w-full bg-body grid grid-rows-[auto_1fr]">
      <Header isAuthenticated={true} user={user as UserDetail} />
      <section className="container flex flex-col gap-4">{children}</section>
    </main>
  );
};
