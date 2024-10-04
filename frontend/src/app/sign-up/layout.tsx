import { SignUpLayout } from '@/components/layouts/sign-up-layout';

const Layout = ({
  children,
  selectAccountType,
}: {
  children: React.ReactNode;
  selectAccountType: React.ReactNode;
}) => {
  return (
    <SignUpLayout>
      {children}
      {selectAccountType}
    </SignUpLayout>
  );
};

export default Layout;
