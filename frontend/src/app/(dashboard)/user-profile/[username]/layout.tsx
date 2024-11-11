import { ReactNode } from 'react';

// Layouts
import { ProfileLayout } from '@/components/layouts';

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { username: string };
}) => <ProfileLayout username={params.username}>{children}</ProfileLayout>;

export default Layout;
