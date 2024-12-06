import { Suspense } from 'react';

// Sections
import { PanelSkeleton } from '@/components/sections';

// Components
import {
  LocationPanel,
  PhotoPanel,
  VideoPanel,
} from '@/features/profile/components';
import { FriendPanel } from '@/features/friend/components';

const PersonalInfoPage = ({ params }: { params: { username: string } }) => (
  <div className="flex flex-col gap-8">
    <Suspense fallback={<PanelSkeleton />}>
      <FriendPanel username={params.username} />
    </Suspense>

    <Suspense fallback={<PanelSkeleton />}>
      <PhotoPanel username={params.username} />
    </Suspense>

    <VideoPanel />

    <LocationPanel />
  </div>
);

export default PersonalInfoPage;
