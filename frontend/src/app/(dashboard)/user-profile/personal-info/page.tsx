import FriendPanel from '@/features/profile/components/friend-panel';
import LocationPanel from '@/features/profile/components/location-panel';
import PhotoPanel from '@/features/profile/components/photo-panel';
import VideoPanel from '@/features/profile/components/video-panel';

const PersonalInfoPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <FriendPanel />

      <PhotoPanel />

      <VideoPanel />

      <LocationPanel />
    </div>
  );
};

export default PersonalInfoPage;
