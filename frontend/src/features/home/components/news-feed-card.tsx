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
import { NewsFeedComments } from './news-feed-comments';

// Types
import { NewsFeed } from '@/types';

// Utils
import { formatDate, getFullName } from '@/utils';
import { NewsFeedCardContent } from './news-feed-card-content';
import { useDisclosure } from '@/hooks';

interface NewsFeedCardProps {
  authorId: string;
  newsFeed: NewsFeed;
  onLike: () => Promise<void>;
}

export const NewsFeedCard = memo(
  ({ authorId, newsFeed, onLike }: NewsFeedCardProps) => {
    const {
      isOpen: isOpenComments,
      onOpen: onOpenComments,
      onClose: onCloseComments,
    } = useDisclosure();

    const { author, createdAt, likes, comments, shares, media, isLiked } =
      newsFeed;

    const title = getFullName(author.firstName, author.lastName);
    const description = formatDate(createdAt);
    const likesCount = likes?.likesTotal || 0;
    const commentsCount = comments?.data.totalComments || 0;
    const sharesCount = shares?.length || 0;

    return (
      <Card className="rounded-xl">
        {isOpenComments && comments ? (
          <NewsFeedComments
            comments={comments}
            onCloseComments={onCloseComments}
          />
        ) : (
          <>
            <UserCardHeader
              user={author}
              title={title}
              description={description}
              moreOptions={NEWS_FEED_MORE_OPTIONS}
              className="p-4"
            />
            <CardContent className="p-4 py-0">
              <NewsFeedCardContent newsFeed={newsFeed} />
              {media && (
                <div className="my-2.5 relative w-full h-[207px] md:h-400 lg:h-[256px] xl:h-[323px] 2xl:h-[353px]">
                  <Image
                    src={media}
                    alt={IMAGES.PROFILE_BANNER_FALLBACK.alt}
                    fill
                    quality={100}
                    priority
                    className="rounded-[12px]"
                    sizes="(max-width: 768px) 100vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute right-0 bottom-[-27px]">
                    <NewsFeedSocialControl
                      authorId={authorId}
                      newsFeed={newsFeed}
                      onOpenComments={onOpenComments}
                      isLiked={isLiked}
                      onLike={onLike}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-4 flex justify-between">
              {likes && <FriendsHaveLiked newsFeedLikes={likes} />}
              <NewsFeedSocialCount
                numberOfLikes={likesCount}
                numberOfComments={commentsCount}
                numberOfShares={sharesCount}
              />
            </CardFooter>
          </>
        )}
      </Card>
    );
  },
);

NewsFeedCard.displayName = 'NewsFeedCard';
