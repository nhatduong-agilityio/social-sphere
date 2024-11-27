import { Users } from 'lucide-react';

// Components
import { Panel, UserCardHeader } from '@/components/sections';
import { Card } from '@/components/ui';

// Utils
import { getFullName } from '@/utils';

// APIs
import { getFriendListByUsername } from '../actions/friends-profile';

interface IFriendPanelProps {
  username: string;
}

export const FriendPanel = async ({ username }: IFriendPanelProps) => {
  const friends = await getFriendListByUsername(username);

  const renderListFriends = friends.map(({ id, followed }) => {
    const title = getFullName(followed.firstName, followed.lastName);
    const description = `${followed.countFriends} Friends`;

    return (
      <Card key={id} className="border">
        <UserCardHeader
          user={followed}
          title={title}
          description={description}
          className="cursor-pointer dark:bg-dark-400 dark:border-dark-400"
        />
      </Card>
    );
  });

  return (
    <Panel
      panelTile="Friends"
      buttonLabel="Invitations"
      startIcon={<Users />}
      countItems={0}
    >
      <div className="w-full grid-cols-1 gap-3 grid md:grid-cols-2">
        {renderListFriends}
      </div>
    </Panel>
  );
};
