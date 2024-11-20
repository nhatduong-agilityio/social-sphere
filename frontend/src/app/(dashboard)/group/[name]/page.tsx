import { notFound } from 'next/navigation';

// Components
import { GroupFeed } from '@/features/group/components';

// Actions
import { getGroupByName } from '@/features/group/actions';

const GroupDetailPage = async ({ params }: { params: { name: string } }) => {
  const { data: group } = await getGroupByName(params.name);

  if (!group) return notFound();

  return <GroupFeed group={group} />;
};

export default GroupDetailPage;
