import { GroupDetail } from '@/types';
import { getGroupMembers, getNewsFeedIdsInGroup } from '../actions';
import { GroupFeedContent } from './group-feed-content';
import { notFound } from 'next/navigation';

interface GroupFeedProps {
  authorId: string;
  group: GroupDetail;
}

export const GroupFeed = async ({ authorId, group }: GroupFeedProps) => {
  const { id } = group;

  const [groupMembersData, newsFeedIdsData] = await Promise.all([
    getGroupMembers(id),
    getNewsFeedIdsInGroup(id),
  ]);

  const groupMembersPagination = groupMembersData.data;
  const newsFeedIdsPagination = newsFeedIdsData.data;

  if (!groupMembersPagination || !newsFeedIdsPagination) notFound();

  return (
    <GroupFeedContent
      authorId={authorId}
      groupId={id}
      groupMembersPagination={groupMembersPagination}
      newsFeedIdsPagination={newsFeedIdsPagination}
    />
  );
};
