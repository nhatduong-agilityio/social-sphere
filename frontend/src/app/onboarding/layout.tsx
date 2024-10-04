import { OnboardingLayout } from '@/components/layouts/onboarding-layout';
import { OnboardingContainer } from '@/features/onboarding/components/onboarding-container';

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
      <OnboardingContainer>{selectAccountType}</OnboardingContainer>
    </OnboardingLayout>
  );
};

export default Layout;
