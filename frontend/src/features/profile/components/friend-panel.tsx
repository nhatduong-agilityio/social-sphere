import { Users } from 'lucide-react';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__/user';

// Components
import { Panel } from '@/components/sections/panel';
import { UserCardHeader } from '@/components/sections/user-card-header';
import { Card } from '@/components/ui/card';

// Utils
import { getFullName } from '@/utils/string';

export const FriendPanel = () => {
  const renderListFriends = MOCK_FRIENDS.map((user) => {
    const title = getFullName(user.firstName, user.lastName);
    const description = `${user.countFriends} Friends`;
    return (
      <Card key={user.id} className="border-none">
        <UserCardHeader
          user={user}
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
