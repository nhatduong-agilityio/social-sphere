import { GroupDetail } from '@/types';
import { getGroupMembers } from '../actions';
import { GroupFeedContent } from './group-feed-content';
import { notFound } from 'next/navigation';

interface GroupFeedProps {
  group: GroupDetail;
}

export const GroupFeed = async ({ group }: GroupFeedProps) => {
  const { id } = group;

  const [groupMembersData] = await Promise.all([getGroupMembers(id)]);

  const groupMembersPagination = groupMembersData.data;

  if (!groupMembersPagination) notFound();

  return (
    <GroupFeedContent
      groupId={id}
      groupMembersPagination={groupMembersPagination}
    />
  );
};
