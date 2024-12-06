import { auth } from '@/auth';

// Actions
import { getGroups } from '@/features/group/actions';

// Components
import { GroupsContent } from './groups-content';

export const GroupsWidget = async () => {
  const session = await auth();
  const userId = String(session?.user?.id);

  const groups = await getGroups(userId);

  return <GroupsContent groups={groups.data} authorId={userId} />;
};
