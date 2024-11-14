import { Fragment, useMemo } from 'react';

import { ROUTER } from '@/constants';

// Components
import { Label, LinkWithIcon } from '@/components/ui';
import { UserCardPopover } from '@/components/sections';

// Types
import { NewsFeedLike, UserDetail } from '@/types';

// Utils
import { cn, getFullName } from '@/utils';

const FriendLink = ({
  friend,
  additionalClass,
}: {
  friend: UserDetail;
  additionalClass: string;
}) => {
  const fullName = useMemo(
    () => getFullName(friend.firstName, friend.lastName),
    [friend.firstName, friend.lastName],
  );

  return (
    <LinkWithIcon
      url={ROUTER.PROFILE_ID_PERSONAL_INFO(friend.username)}
      text={fullName}
      additionalClass={additionalClass}
    />
  );
};

const FriendAvatars = ({ newsFeedLikes }: { newsFeedLikes: NewsFeedLike }) => (
  <div className="flex">
    {newsFeedLikes.likesRecent.map(({ friend }, index) => (
      <div
        key={friend.id}
        className={cn('relative', index > 0 && 'ml-[-12px]')}
      >
        <UserCardPopover
          user={friend}
          size="lg"
          additionalAvatarClass="border-[3px] border-white dark:border-dark-800"
        />
      </div>
    ))}
  </div>
);

interface FriendsHaveLikedProps {
  newsFeedLikes: NewsFeedLike;
}

export const FriendsHaveLiked = ({ newsFeedLikes }: FriendsHaveLikedProps) => {
  const totalLikes = newsFeedLikes.likesTotal;
  const remainingLikes = newsFeedLikes.remainingLikes;

  if (!newsFeedLikes?.likesRecent?.length) {
    return null;
  }

  const displayText = () => {
    const firstTwoFriends = newsFeedLikes.likesRecent.slice(0, 2);

    return {
      names: firstTwoFriends.map(({ friend }, index) => (
        <Fragment key={friend.id}>
          <FriendLink
            friend={friend}
            additionalClass="border-none text-2xs hover:bg-transparent hover:text-primary"
          />
          {index === 0 && (
            <Label className="text-2xs text-neutral-300">
              {totalLikes < 2 ? (
                ''
              ) : totalLikes === 2 ? (
                <>&nbsp;and&nbsp;</>
              ) : (
                <>,&nbsp;</>
              )}
            </Label>
          )}
        </Fragment>
      )),
      description: remainingLikes
        ? `and ${remainingLikes} more liked this`
        : 'liked this',
    };
  };

  const { names, description } = displayText();

  return (
    <div className="flex items-center gap-3">
      <FriendAvatars newsFeedLikes={newsFeedLikes} />
      <div className="flex flex-col">
        <div className="flex items-baseline">{names}</div>
        <Label className="text-neutral-300 text-2xs">{description}</Label>
      </div>
    </div>
  );
};
