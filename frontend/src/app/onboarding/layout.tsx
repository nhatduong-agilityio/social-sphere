import { ReactNode } from 'react';

// Components
import { OnboardingLayout } from '@/components/layouts/onboarding-layout';
import { OnboardingContainer } from '@/features/onboarding/components/onboarding-container';

const Layout = ({
  children,
  selectAccountType,
  enterAboutInfo,
  uploadPictureProfile,
  secureAccount,
  confirmEmail,
}: {
  children: ReactNode;
  selectAccountType: ReactNode;
  enterAboutInfo: ReactNode;
  uploadPictureProfile: ReactNode;
  secureAccount: ReactNode;
  confirmEmail: ReactNode;
}) => (
  <OnboardingLayout>
    {children}
    <OnboardingContainer
      selectAccountType={selectAccountType}
      enterAboutInfo={enterAboutInfo}
      uploadPictureProfile={uploadPictureProfile}
      secureAccount={secureAccount}
      confirmEmail={confirmEmail}
    />
  </OnboardingLayout>
);

export default Layout;
