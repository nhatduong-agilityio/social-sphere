'use client';

import { Fragment, memo, useEffect, useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import Image from 'next/image';

// Icons
import { XIcon } from 'lucide-react';

// Constants
import { ROUTER } from '@/constants';
import { MOODS } from '../constants';

// Components
import { Label, LinkWithIcon, Button } from '@/components/ui';

// Actions
import { getTaggedFriends } from '../actions';

// Types
import { UserDetail } from '@/types';

// Utils
import { getFullName, cn } from '@/utils';
import { getMoodOptions } from '../utils/feed';

interface ComposeActivityPreviewProps {
  mood?: {
    title: string;
    content: string;
  };
  location?: string;
  hasWithFriends?: boolean;
  friendIds: string[];
  onRemoveFriend: (friendId: string) => void;
}

const FriendLink = ({
  friend,
  index,
  total,
}: {
  friend: UserDetail;
  index: number;
  total: number;
}) => (
  <Fragment>
    <LinkWithIcon
      url={`${ROUTER.USER_PROFILE}/${friend.id}`}
      text={getFullName(friend.firstName, friend.lastName)}
      additionalClass={cn(
        'border-none w-fit text-primary hover:dark:bg-transparent',
        index > 0 && 'ml-8',
      )}
    />
    {index < total - 1 && ','}
  </Fragment>
);

const FriendTag = ({
  friend,
  onRemove,
}: {
  friend: UserDetail;
  onRemove: () => void;
}) => (
  <div className="flex items-center text-3xs text-white">
    <LinkWithIcon
      url={`${ROUTER.USER_PROFILE}/${friend.id}`}
      text={getFullName(friend.firstName, friend.lastName)}
      additionalClass="border-none rounded-s-[4px] h-full bg-neutral-300 dark:bg-dark-900 hover:underline hover:bg-neutral-300 hover:dark:bg-dark-900 px-[9px]"
    />
    <Button
      variant="unstyle"
      className="p-0 border-none rounded-e-[4px] w-6 h-6 text-primary bg-gray-300 dark:bg-dark-300 hover:bg-gray-600 hover:dark:bg-dark-300"
      onClick={onRemove}
    >
      <XIcon size={16} />
    </Button>
  </div>
);

export const ComposeActivityPreview = memo(
  ({
    mood,
    friendIds,
    hasWithFriends = true,
    location,
    onRemoveFriend,
  }: ComposeActivityPreviewProps) => {
    const [allFriends, setAllFriends] = useState<UserDetail[]>([]);
    const { moodOption, moodDetail } = getMoodOptions(
      mood?.title,
      mood?.content,
    );

    useEffect(() => {
      const fetchFriends = async () => {
        const data = await getTaggedFriends(friendIds);
        if (data) setAllFriends(data);
      };

      fetchFriends();
    }, [friendIds]);

    const matchedFriends =
      allFriends?.filter((friend) => friendIds.includes(friend.id)) || [];

    if (mood?.content === '' && friendIds.length === 0 && location === '') {
      return null;
    }

    const displayDetail = moodDetail || hasWithFriends || location;

    return (
      <div className="flex flex-col gap-2 mb-2">
        {displayDetail && (
          <Label className="w-fit flex flex-wrap items-center text-center bg-gray-200 dark:bg-dark-500 px-2 py-0.5 rounded-full">
            {moodDetail && (
              <div className="flex items-center gap-3 pr-1 text-2xs">
                <div className="w-[14px] h-[14px] rounded-full relative">
                  {moodDetail.icon ? (
                    <Image
                      alt={moodDetail.value || 'Mood item image'}
                      src={`${moodDetail.icon}`}
                      fill
                      sizes="14px"
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        borderRadius: '100%',
                      }}
                    />
                  ) : (
                    <CircleFlag countryCode={moodDetail.value} />
                  )}
                </div>
                {moodOption.value !== MOODS.STATUS && `is ${moodOption.label}`}
                <LinkWithIcon
                  url="/"
                  text={moodDetail.label}
                  additionalClass="border-none w-fit text-primary hover:dark:bg-transparent mr-3"
                />
              </div>
            )}
            {matchedFriends.length > 0 && (
              <>
                - with&nbsp;
                {matchedFriends.map((friend, index) => (
                  <FriendLink
                    key={friend.id}
                    friend={friend}
                    index={index}
                    total={matchedFriends.length}
                  />
                ))}
              </>
            )}
            {location && (
              <>
                - at&nbsp;
                <LinkWithIcon
                  url="/"
                  text={location}
                  additionalClass="border-none w-fit text-primary hover:dark:bg-transparent mr-3"
                />
              </>
            )}
          </Label>
        )}
        <div className="flex flex-wrap gap-[6px]">
          {matchedFriends.map((friend) => (
            <FriendTag
              key={friend.id}
              friend={friend}
              onRemove={() => onRemoveFriend(friend.id)}
            />
          ))}
        </div>
      </div>
    );
  },
);

ComposeActivityPreview.displayName = 'ComposeActivityPreview';
