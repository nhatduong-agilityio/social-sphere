import { ReactNode } from 'react';

// Layouts
import { ProfileLayout } from '@/components/layouts';

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => <ProfileLayout userId={params.id}>{children}</ProfileLayout>;

export default Layout;
