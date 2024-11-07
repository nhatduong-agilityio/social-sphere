import { memo } from 'react';
import Image from 'next/image';
import { Bookmark, Ellipsis, MapPin, MessageCircle, Users } from 'lucide-react';

// Components
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from '@/components/ui';

// Types
import { UserDetail } from '@/types';

// Constants
import { IMAGES, ROUTER } from '@/constants';

// Utils
import { getFirstLetters, getFullName } from '@/utils';
import Link from 'next/link';

interface UserPopoverProps {
  user: UserDetail;
}

export const UserContentPopover = memo(({ user }: UserPopoverProps) => {
  const {
    id,
    profilePicture,
    firstName,
    lastName,
    countFriends = 0,
    location,
    banner,
  } = user;

  return (
    <Card className="h-full p-2">
      <div className="relative w-full h-28">
        <Image
          src={banner || IMAGES.PROFILE_BANNER.url}
          alt={IMAGES.PROFILE_BANNER.alt}
          fill
          quality={100}
          priority
          sizes="(max-width: 768px) 100vw"
          style={{ objectFit: 'cover' }}
        />

        <Avatar className="absolute bg-current w-[50px] h-[50px] -bottom-6 right-4 border-3 border-slate-900">
          <AvatarImage
            src={profilePicture}
            alt={`Avatar of the user-${getFullName(firstName, lastName)} in team`}
          />
          <AvatarFallback>
            {getFirstLetters(firstName, lastName)}
          </AvatarFallback>
        </Avatar>
      </div>

      <Link
        href={ROUTER.PROFILE_ID_PERSONAL_INFO(id)}
        className="flex flex-col mt-2"
      >
        <CardTitle className="text-md mb-2">
          {getFullName(firstName, lastName)}
        </CardTitle>
        <CardContent className="flex flex-col gap-2 p-0">
          <div className="flex items-center gap-3 text-sm text-neutral-200">
            <Users size={16} />
            {countFriends} mutual friend(s)
          </div>

          {location && (
            <div className="flex items-center gap-2 text-sm text-neutral-200">
              <MapPin size={16} />
              <div>
                From{' '}
                <a className="text-sky-600" href="#">
                  {location.city}
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Link>

      <CardFooter className="flex p-0 justify-end">
        <Button size="icon" variant="unstyle">
          <Ellipsis size={16} />
        </Button>

        <Button size="icon" variant="unstyle">
          <Bookmark size={16} />
        </Button>

        <Button size="icon" variant="unstyle">
          <MessageCircle size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
});

UserContentPopover.displayName = 'UserContentPopover';
