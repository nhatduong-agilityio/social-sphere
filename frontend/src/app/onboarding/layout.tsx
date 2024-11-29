import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';

// Constants
import { BASE_URL, METADATA, ROUTER } from '@/constants';

// Components
import { OnboardingLayout } from '@/components/layouts';
import { OnboardingContainer } from '@/features/onboarding/components';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: METADATA.TITLE,
  description: METADATA.DESCRIPTION,
  keywords: METADATA.KEY_WORDS,
  openGraph: {
    type: 'website',
    url: `${BASE_URL}${ROUTER.ONBOARDING}`,
    title: METADATA.TITLE,
    description: METADATA.DESCRIPTION,
    siteName: METADATA.TITLE,
  },
  twitter: {
    title: METADATA.TITLE,
    description: METADATA.DESCRIPTION,
    card: 'summary',
  },
};

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
