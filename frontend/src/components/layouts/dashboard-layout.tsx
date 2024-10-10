import { ReactNode } from 'react';

// Components
import { Header } from './header';

export const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <main className="h-dvh w-dvw bg-body grid grid-rows-[auto_1fr]">
    <Header isAuthenticated={true} />
    <section className="container px-3 flex flex-col mx-auto gap-4">
      {children}
    </section>
  </main>
);
