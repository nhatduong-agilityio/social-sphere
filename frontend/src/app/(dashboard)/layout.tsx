import { ReactNode } from 'react';

// Components
import { DashboardLayout } from '@/components/layouts/dashboard-layout';

const Layout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
