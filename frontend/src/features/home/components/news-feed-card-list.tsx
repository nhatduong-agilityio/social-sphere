import { NewsFeed } from '@/types';
import { NewsFeedCard } from './news-feed-card';

interface NewsFeedCardListProps {
  newsFeeds: NewsFeed[];
}

export const NewsFeedCardList = ({ newsFeeds }: NewsFeedCardListProps) => (
  <>
    {newsFeeds.map((newsFeed) => (
      <NewsFeedCard key={newsFeed.id} newsFeed={newsFeed} />
    ))}
  </>
);
