import { ComponentProps, ReactNode } from 'react';

// Components
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Types
import { UserDetail } from '@/types/user';

// Utils
import { getFirstLetters } from '@/utils/converter';

interface UserCardProps extends ComponentProps<typeof Card> {
  user: UserDetail;
  endIcon?: ReactNode;
}

export const UserCard = ({ user, endIcon, ...props }: UserCardProps) => {
  const { avatar, firstName, lastName, countFriends = 0 } = user;

  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <Card
      className="p-3 flex w-full items-center justify-between group cursor-pointer"
      {...props}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src={avatar}
            alt={`Avatar of the user-${fullName} in team`}
          />
          <AvatarFallback>
            {getFirstLetters(firstName, lastName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <CardTitle className="text-base">{fullName}</CardTitle>
          <CardDescription>{countFriends} Friends</CardDescription>
        </div>
      </div>

      <Button
        size="icon"
        variant="rounded"
        className="hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        {endIcon}
      </Button>
    </Card>
  );
};
