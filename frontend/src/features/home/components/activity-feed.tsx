import { ActivityFeedContent } from './activity-feed-content';
import { getNewsFeeds } from '../actions/get-news-feeds';
import { notFound } from 'next/navigation';

export const ActivityFeed = async () => {
  const { data: newsFeeds } = await getNewsFeeds();

  if (!newsFeeds) notFound();

  return <ActivityFeedContent newsFeeds={newsFeeds} />;
};
