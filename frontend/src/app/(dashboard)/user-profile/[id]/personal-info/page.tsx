import {
  FriendPanel,
  LocationPanel,
  PhotoPanel,
  VideoPanel,
} from '@/features/profile/components';

const PersonalInfoPage = async ({ params }: { params: { id: string } }) => (
  <div className="flex flex-col gap-8">
    <FriendPanel userId={params.id} />

    <PhotoPanel userId={params.id} />

    <VideoPanel />

    <LocationPanel />
  </div>
);

export default PersonalInfoPage;
