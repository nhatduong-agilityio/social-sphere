import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

// Components
import { Header } from './header';

// Auth
import { auth } from '@/auth';

// Constants
import { ROUTER } from '@/constants';

export const DashboardLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = (await auth()) ?? {};
  const jwt: string = user?.jwt as string;

  if (!jwt) return redirect(ROUTER.LOGIN);

  return (
    <main className="min-h-screen w-full bg-body grid grid-rows-[auto_1fr]">
      <Header isAuthenticated={true} user={user} />
      <section className="container flex flex-col gap-4">{children}</section>
    </main>
  );
};
