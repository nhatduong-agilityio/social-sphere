import { ReactNode } from 'react';

// Components
import { Header } from './header';

export const SignUpLayout = ({ children }: { children: ReactNode }) => (
  <main className="h-dvh w-dvw bg-body ">
    <Header isAuthenticated={false} />
    <section className="container">{children}</section>
  </main>
);
