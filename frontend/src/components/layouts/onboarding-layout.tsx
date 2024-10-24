import { ReactNode } from 'react';

// Components
import { Header } from './header';

export const OnboardingLayout = ({ children }: { children: ReactNode }) => (
  <main className="h-dvh w-dvw bg-body grid grid-rows-[auto_1fr]">
    <Header isAuthenticated={false} />
    <section className="grid grid-rows-[auto_1fr] place-items-center bg-body">
      {children}
    </section>
  </main>
);
