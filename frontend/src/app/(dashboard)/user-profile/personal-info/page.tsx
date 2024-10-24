import {
  FriendPanel,
  LocationPanel,
  PhotoPanel,
  VideoPanel,
} from '@/features/profile/components';

const PersonalInfoPage = () => (
  <div className="flex flex-col gap-8">
    <FriendPanel />

    <PhotoPanel />

    <VideoPanel />

    <LocationPanel />
  </div>
);

export default PersonalInfoPage;
