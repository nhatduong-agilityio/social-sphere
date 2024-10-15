import { EllipsisVertical, Users } from 'lucide-react';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__/user';

// Components
import Panel from '@/components/sections/panel';
import { UserCard } from '@/components/sections/user-card';

const FriendPanel = () => {
  const renderListFriends = MOCK_FRIENDS.map((user) => (
    <UserCard key={user.id} user={user} endIcon={<EllipsisVertical />} />
  ));

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

export default FriendPanel;
