import { ReactNode } from 'react';

// Components
import { LoginLayout } from '@/components/layouts/login-layout';

const Layout = ({ children }: { children: ReactNode }) => (
  <LoginLayout>{children}</LoginLayout>
);

export default Layout;
