import { memo } from 'react';
import Image from 'next/image';

// Constants
import { NEWS_FEED_MORE_OPTIONS } from '../constants';
import { IMAGES } from '@/constants';

// Components
import { UserCardHeader } from '@/components/sections';
import { Card, CardContent, CardFooter } from '@/components/ui';
import { NewsFeedSocialControl } from './news-feed-social-control';
import { FriendsHaveLiked } from './friends-have-liked';
import { NewsFeedSocialCount } from './news-feed-social-count';

// Types
import { NewsFeed } from '@/types';

// Utils
import { formatDate, getFullName } from '@/utils';
import { NewsFeedCardDetail } from './news-feed-card-detail';

interface NewsFeedCardProps {
  newsFeed: NewsFeed;
}

export const NewsFeedCard = memo(({ newsFeed }: NewsFeedCardProps) => {
  const { user, createdDate, likes, comments, shares, isLiked } = newsFeed;

  const title = getFullName(user.firstName, user.lastName);
  const description = formatDate(createdDate);
  const likesCount = likes?.likesTotal || 0;
  const commentsCount = comments?.data.length || 0;
  const sharesCount = shares?.length || 0;

  return (
    <Card className="rounded-xl">
      <UserCardHeader
        user={user}
        title={title}
        description={description}
        moreOptions={NEWS_FEED_MORE_OPTIONS}
        className="p-4"
      />
      <CardContent className="p-4 py-0">
        <NewsFeedCardDetail newsFeed={newsFeed} />
        <div className="my-2.5 relative w-full h-[207px] md:h-400 lg:h-[256px] xl:h-[323px] 2xl:h-[353px]">
          <Image
            src={IMAGES.PROFILE_BANNER_FALLBACK.url}
            alt={IMAGES.PROFILE_BANNER_FALLBACK.alt}
            fill
            quality={100}
            priority
            className="rounded-[12px]"
            sizes="(max-width: 768px) 100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute right-0 bottom-[-27px]">
            <NewsFeedSocialControl isLiked={isLiked} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between">
        {likes && <FriendsHaveLiked newsFeedLikes={likes} />}
        <NewsFeedSocialCount
          numberOfLikes={likesCount}
          numberOfComments={commentsCount}
          numberOfShares={sharesCount}
        />
      </CardFooter>
    </Card>
  );
});

NewsFeedCard.displayName = 'NewsFeedCard';
