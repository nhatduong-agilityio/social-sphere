import { OnboardingLayout } from '@/components/layouts/onboarding-layout';

const Layout = ({
  children,
  selectAccountType,
}: {
  children: React.ReactNode;
  selectAccountType: React.ReactNode;
}) => {
  return (
    <OnboardingLayout>
      {children}
      {selectAccountType}
    </OnboardingLayout>
  );
};

export default Layout;
