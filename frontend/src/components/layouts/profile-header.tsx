'use client';

import { useCallback, useMemo, useState } from 'react';
import { PlusIcon } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import Banner from '@/components/sections/profile-banner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Images
import AvatarPlaceholder from '../../../public/images/avatar-placeholder.svg';

// Utils
import { cn } from '@/utils/cn';

interface ProfileHeaderProps {
  avatarUrl?: string;
}

const ProfileHeader = ({
  avatarUrl = AvatarPlaceholder.src,
}: ProfileHeaderProps) => {
  const baseStyleButton = 'w-[140px] border border-gray-900';
  const [isActive, setIsActive] = useState(false);

  const handleActiveButton = useCallback(
    () => setIsActive(!isActive),
    [isActive],
  );

  const avatarContent = useMemo(
    () => (
      <div className="w-[110px] h-[110px] rounded-full p-[8.5px] absolute md:bottom-0 bottom-[-50px] left-0 right-0 mx-auto z-10">
        <Avatar className="w-[full] h-[full]">
          <AvatarImage src={avatarUrl} alt="Profile picture" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button
          variant="rounded"
          size="icon"
          className="absolute bg-blue-500 bottom-0 right-2 w-[34px] h-[34px]"
          aria-label="Upload profile picture"
          onClick={handleActiveButton}
        >
          <PlusIcon
            size={18}
            className={cn(
              'text-white transition-all duration-300',
              isActive && 'transform rotate-[135deg]',
            )}
          />
        </Button>
      </div>
    ),
    [avatarUrl, handleActiveButton, isActive],
  );

  return (
    <div className="flex flex-col items-center justify-center relative">
      <Banner />

      <div className="w-full flex justify-between pt-2">
        <div className="hidden md:block space-x-2">
          <Button className={baseStyleButton}>Timeline</Button>
          <Button className={baseStyleButton}>About</Button>
        </div>
        {avatarContent}
        <div className="hidden md:block space-x-2">
          <Button className={baseStyleButton}>Friends</Button>
          <Button className={baseStyleButton}>Photos</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
