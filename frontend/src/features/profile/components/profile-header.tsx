// Components
import { Button } from '@/components/ui';
import { UploadBannerProfile } from '@/features/profile/components';
import { ProfileAvatar } from './profile-avatar';

interface ProfileHeaderProps {
  bannerUrl?: string;
  imageUrl?: string;
}

export const ProfileHeader = ({ imageUrl, bannerUrl }: ProfileHeaderProps) => {
  const baseStyleButton = 'w-[140px] border border-gray-900';

  return (
    <div className="flex flex-col items-center justify-center relative">
      <UploadBannerProfile url={bannerUrl} />

      <div className="w-full flex justify-between pt-2">
        <div className="hidden md:block space-x-2">
          <Button className={baseStyleButton}>Timeline</Button>
          <Button className={baseStyleButton}>About</Button>
        </div>
        <ProfileAvatar imageUrl={imageUrl} />
        <div className="hidden md:block space-x-2">
          <Button className={baseStyleButton}>Friends</Button>
          <Button className={baseStyleButton}>Photos</Button>
        </div>
      </div>
    </div>
  );
};
