import { ReactNode } from 'react';

// Components
import { DashboardLayout } from '@/components/layouts';

const Layout = ({ children }: { children: ReactNode }) => (
  <DashboardLayout>{children}</DashboardLayout>
);

export default Layout;
