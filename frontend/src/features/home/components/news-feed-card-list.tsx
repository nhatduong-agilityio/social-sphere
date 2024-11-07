import { memo } from 'react';

// Components
import { NewsFeedCard } from './news-feed-card';

// Types
import { NewsFeed } from '@/types';

interface NewsFeedCardListProps {
  authorId: string;
  newsFeeds: NewsFeed[];
}

export const NewsFeedCardList = memo(
  ({ authorId, newsFeeds }: NewsFeedCardListProps) => (
    <div className="flex flex-col gap-6">
      {newsFeeds.map((newsFeed) => (
        <NewsFeedCard
          key={newsFeed.id}
          newsFeed={newsFeed}
          authorId={authorId}
        />
      ))}
    </div>
  ),
);

NewsFeedCardList.displayName = 'NewsFeedCardList';
