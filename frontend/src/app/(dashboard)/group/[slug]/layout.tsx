import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';

// Constants
import { BASE_URL, METADATA, ROUTER } from '@/constants';

// Layouts
import { GroupLayout } from '@/components/layouts';

// Actions
import { getGroupByName } from '@/features/group/actions';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const { data: group } = await getGroupByName(slug);

  return {
    metadataBase: new URL(BASE_URL),
    title: METADATA.TITLE,
    description: METADATA.DESCRIPTION,
    keywords: METADATA.KEY_WORDS,
    openGraph: {
      type: 'website',
      url: `${BASE_URL}${ROUTER.GROUP_NAME(group?.name || '')}`,
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
}) => <GroupLayout groupName={params.slug}>{children}</GroupLayout>;

export default Layout;
