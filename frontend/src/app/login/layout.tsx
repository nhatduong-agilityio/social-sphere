import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';

// Constants
import { BASE_URL, ROUTER, METADATA } from '@/constants';

// Components
import { LoginLayout } from '@/components/layouts';

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
    url: `${BASE_URL}${ROUTER.LOGIN}`,
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

const Layout = ({ children }: { children: ReactNode }) => (
  <LoginLayout>{children}</LoginLayout>
);

export default Layout;
