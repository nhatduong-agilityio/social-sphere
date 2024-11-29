import { Suspense } from 'react';

// Sections
import { PanelSkeleton } from '@/components/sections';

// Components
import {
  FriendPanel,
  LocationPanel,
  PhotoPanel,
  VideoPanel,
} from '@/features/profile/components';

const PersonalInfoPage = ({ params }: { params: { slug: string } }) => (
  <div className="flex flex-col gap-8">
    <Suspense fallback={<PanelSkeleton />}>
      <FriendPanel username={params.slug} />
    </Suspense>

    <Suspense fallback={<PanelSkeleton />}>
      <PhotoPanel username={params.slug} />
    </Suspense>

    <VideoPanel />

    <LocationPanel />
  </div>
);

export default PersonalInfoPage;
