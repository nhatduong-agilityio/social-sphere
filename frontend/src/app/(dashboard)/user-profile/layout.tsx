import { ReactNode } from 'react';

// Layouts
import { ProfileLayout } from '@/components/layouts/profile-layout';

const Layout = ({ children }: { children: ReactNode }) => (
  <ProfileLayout>{children}</ProfileLayout>
);

export default Layout;
