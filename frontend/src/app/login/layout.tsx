import { ReactNode } from 'react';

// Components
import { LoginLayout } from '@/components/layouts';

const Layout = ({ children }: { children: ReactNode }) => (
  <LoginLayout>{children}</LoginLayout>
);

export default Layout;
