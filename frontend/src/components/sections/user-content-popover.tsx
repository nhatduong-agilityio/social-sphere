import Image from 'next/image';
import { Bookmark, Ellipsis, MapPin, MessageCircle, Users } from 'lucide-react';

// Components
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Types
import { UserDetail } from '@/types/user';

// Constants
import { IMAGES } from '@/constants/images';

// Utils
import { getFirstLetters, getFullName } from '@/utils/string';

interface UserPopoverProps {
  user: UserDetail;
}

const UserContentPopover = ({ user }: UserPopoverProps) => {
  const {
    avatar,
    firstName,
    lastName,
    countFriends = 0,
    location,
    banner = IMAGES.PROFILE_BANNER.url,
  } = user;

  return (
    <Card className="h-full p-2">
      <div className="relative w-full h-28">
        <Image
          src={banner}
          alt={IMAGES.PROFILE_BANNER.alt}
          fill
          quality={100}
          priority
          sizes="(max-width: 768px) 100vw"
          style={{ objectFit: 'cover' }}
        />

        <Avatar className="absolute w-[50px] h-[50px] -bottom-6 right-4 border-3 border-slate-900">
          <AvatarImage
            src={avatar}
            alt={`Avatar of the user-${getFullName(firstName, lastName)} in team`}
          />
          <AvatarFallback>
            {getFirstLetters(firstName, lastName)}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col mt-2">
        <CardTitle className="text-md mb-2">
          {getFullName(firstName, lastName)}
        </CardTitle>
        <CardContent className="flex flex-col gap-2 p-0">
          <div className="flex items-center gap-3 text-sm text-neutral-200">
            <Users size={16} />
            {countFriends} mutual friend(s)
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-200">
            <MapPin size={16} />
            <div>
              From{' '}
              <a className="text-sky-600" href="#">
                {location?.city}
              </a>
            </div>
          </div>
        </CardContent>
      </div>

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
};

export default UserContentPopover;
