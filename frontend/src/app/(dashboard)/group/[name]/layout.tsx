import { ReactNode } from 'react';

// Layouts
import { GroupLayout } from '@/components/layouts';

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { name: string };
}) => <GroupLayout groupName={params.name}>{children}</GroupLayout>;

export default Layout;
