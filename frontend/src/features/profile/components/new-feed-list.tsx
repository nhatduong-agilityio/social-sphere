import { notFound } from 'next/navigation';

// Components
import { NewFeedContent } from './new-feed-content';

// Types
import { Pagination } from '@/types';

// Actions
import { getNewsFeedIds } from '../actions';

interface NewFeedListProps {
  username: string;
  authorId: string;
}

export const NewFeedList = async ({ authorId }: NewFeedListProps) => {
  const newsFeedIdsResponse = await getNewsFeedIds(authorId);

  const newsFeedIds = newsFeedIdsResponse.data;

  if (!newsFeedIds || !authorId) notFound();

  return (
    <NewFeedContent
      authorId={authorId}
      newsFeedIds={newsFeedIds?.data || []}
      pagination={newsFeedIds?.meta.pagination as Pagination}
    />
  );
};
