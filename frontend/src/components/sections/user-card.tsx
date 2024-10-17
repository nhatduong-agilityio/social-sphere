import { ComponentProps, ReactNode } from 'react';

// Components
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Types
import { UserDetail } from '@/types/user';

// Constants
import UserPopover from './user-popover';

// Utils
import { getFullName } from '@/utils/string';

interface UserCardProps extends ComponentProps<typeof Card> {
  user: UserDetail;
  endIcon?: ReactNode;
}

export const UserCard = ({ user, endIcon, ...props }: UserCardProps) => {
  const { firstName, lastName, countFriends = 0 } = user;

  return (
    <Card
      className="p-3 flex w-full items-center justify-between group cursor-pointer dark:bg-dark-400 dark:border-dark-400"
      {...props}
    >
      <div className="flex items-center gap-3">
        <UserPopover user={user} />

        <div className="flex flex-col">
          <CardTitle className="text-sm">
            {getFullName(firstName, lastName)}
          </CardTitle>
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
