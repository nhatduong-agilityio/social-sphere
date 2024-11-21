import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

// Auth
import { auth } from '@/auth';

// Constants
import { ROUTER } from '@/constants';
import { HeaderContainer } from './header-container';

export const DashboardLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = (await auth()) ?? {};
  const jwt: string = user?.jwt as string;

  if (!jwt) return redirect(ROUTER.LOGIN);

  return (
    <main className="h-screen min-w-max bg-body grid grid-rows-[auto_1fr]">
      <HeaderContainer username={user?.username as string} />
      <section className="container flex flex-col gap-4">{children}</section>
    </main>
  );
};
