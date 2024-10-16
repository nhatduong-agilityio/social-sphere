// Components
import { Button } from '@/components/ui/button';
import UploadBannerProfile from '@/features/profile/components/upload-banner-profile';
import { ProfileAvatar } from './profile-avatar';

const ProfileHeader = () => {
  const baseStyleButton = 'w-[140px] border border-gray-900';

  return (
    <div className="flex flex-col items-center justify-center relative">
      <UploadBannerProfile />

      <div className="w-full flex justify-between pt-2">
        <div className="hidden md:block space-x-2">
          <Button className={baseStyleButton}>Timeline</Button>
          <Button className={baseStyleButton}>About</Button>
        </div>
        <ProfileAvatar />
        <div className="hidden md:block space-x-2">
          <Button className={baseStyleButton}>Friends</Button>
          <Button className={baseStyleButton}>Photos</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
