import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';

// Constants
import { BASE_URL, METADATA, ROUTER } from '@/constants';

// Layouts
import { ProfileLayout } from '@/components/layouts';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const generateMetadata = async ({
  params: { username },
}: {
  params: { username: string };
}): Promise<Metadata> => ({
  metadataBase: new URL(BASE_URL),
  title: METADATA.TITLE,
  description: METADATA.DESCRIPTION,
  keywords: METADATA.KEY_WORDS,
  openGraph: {
    type: 'website',
    url: `${BASE_URL}${ROUTER.PROFILE_MAIN(username)}`,
    title: METADATA.TITLE,
    description: METADATA.DESCRIPTION,
    siteName: METADATA.TITLE,
  },
  twitter: {
    title: METADATA.TITLE,
    description: METADATA.DESCRIPTION,
    card: 'summary',
  },
});

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { username: string };
}) => <ProfileLayout username={params.username}>{children}</ProfileLayout>;

export default Layout;
