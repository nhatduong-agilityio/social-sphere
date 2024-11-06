import { getProfile } from '@/features/profile/actions';
import {
  FriendPanel,
  LocationPanel,
  PhotoPanel,
  VideoPanel,
} from '@/features/profile/components';

const PersonalInfoPage = async () => {
  const { id } = await getProfile();

  return (
    <div className="flex flex-col gap-8">
      <FriendPanel userId={id} />

      <PhotoPanel />

      <VideoPanel />

      <LocationPanel />
    </div>
  );
};

export default PersonalInfoPage;
