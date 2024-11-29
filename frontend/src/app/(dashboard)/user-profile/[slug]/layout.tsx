import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';

// Constants
import { BASE_URL, METADATA, ROUTER } from '@/constants';

// Layouts
import { ProfileLayout } from '@/components/layouts';

// Actions
import { getProfile } from '@/features/profile/actions';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const profile = await getProfile(slug);

  return {
    metadataBase: new URL(BASE_URL),
    title: METADATA.TITLE,
    description: METADATA.DESCRIPTION,
    keywords: METADATA.KEY_WORDS,
    openGraph: {
      type: 'website',
      url: `${BASE_URL}${ROUTER.PROFILE_MAIN(profile?.username)}`,
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
};

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) => <ProfileLayout username={params.slug}>{children}</ProfileLayout>;

export default Layout;
