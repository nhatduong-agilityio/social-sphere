import { notFound } from 'next/navigation';

// Components
import { GroupFeed } from '@/features/group/components';

// Actions
import { getGroupByName } from '@/features/group/actions';

// Hooks
import { auth } from '@/auth';

const GroupDetailPage = async ({ params }: { params: { name: string } }) => {
  const session = await auth();
  const userId = session?.user?.id;

  const { data: group } = await getGroupByName(params.name);

  if (!group || !userId) return notFound();

  return <GroupFeed group={group} authorId={userId} />;
};

export default GroupDetailPage;
