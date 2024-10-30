import { ReactNode } from 'react';

// Components
import { Header } from './header';

// Actions
import { getProfile } from '@/features/profile/actions';

export const DashboardLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const profile = await getProfile();

  return (
    <main className="min-h-screen w-full bg-body grid grid-rows-[auto_1fr]">
      <Header isAuthenticated={true} user={profile} />
      <section className="container flex flex-col gap-4">{children}</section>
    </main>
  );
};
