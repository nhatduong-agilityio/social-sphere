'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Components
import { Button } from '@/components/ui';
import {
  UploadBannerProfile,
  ProfileAvatar,
} from '@/features/profile/components';

// Constants
import { ROUTER } from '@/constants';

// Utils
import { cn } from '@/utils';

interface ProfileHeaderProps {
  username: string;
  bannerUrl?: string;
  imageUrl?: string;
}

export const ProfileHeader = ({
  username,
  imageUrl,
  bannerUrl,
}: ProfileHeaderProps) => {
  const baseStyleButton =
    'w-[140px] border border-gray-900 dark:text-neutral-50 text-neutral-600';
  const activeButton = 'w-[140px] text-blue-600 border border-red-600';
  const pathname = decodeURIComponent(usePathname() || '');

  const isActiveRoute = () => {
    const routes = [
      ROUTER.PROFILE_ID_OVERVIEW(username),
      ROUTER.PROFILE_ID_PERSONAL_INFO(username),
      ROUTER.PROFILE_ID_EDUCATION(username),
      ROUTER.PROFILE_ID_JOBS(username),
    ];
    return routes.some((route) => decodeURIComponent(route) === pathname);
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <UploadBannerProfile url={bannerUrl} />

      <div className="w-full flex justify-between pt-2">
        <div className="hidden md:block space-x-2">
          <Button className={baseStyleButton}>Timeline</Button>
          <Link href={ROUTER.PROFILE_ID_OVERVIEW(username)}>
            <Button
              className={cn(baseStyleButton, isActiveRoute() && activeButton)}
              disabled={isActiveRoute()}
            >
              About
            </Button>
          </Link>
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
