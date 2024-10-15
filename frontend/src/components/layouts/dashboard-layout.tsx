import { ReactNode } from 'react';

// Components
import { Header } from './header';

export const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <main className="min-h-screen w-full bg-body grid grid-rows-[auto_1fr]">
    <Header isAuthenticated={true} />
    <section className="container flex flex-col gap-4">{children}</section>
  </main>
);
