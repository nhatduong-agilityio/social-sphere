import { memo } from 'react';

// Components
import { NewsFeedCard } from './news-feed-card';

// Types
import { NewsFeed } from '@/types';

interface NewsFeedCardListProps {
  newsFeeds: NewsFeed[];
}

export const NewsFeedCardList = memo(({ newsFeeds }: NewsFeedCardListProps) => (
  <div className="flex flex-col gap-6">
    {newsFeeds.map((newsFeed) => (
      <NewsFeedCard key={newsFeed.id} newsFeed={newsFeed} />
    ))}
  </div>
));

NewsFeedCardList.displayName = 'NewsFeedCardList';
