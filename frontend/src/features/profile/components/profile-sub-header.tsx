import { Clock } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';

// Types
import { UserDetail } from '@/types/user';

// Utils
import { formatNumber } from '@/utils/number';

interface ProfileSubHeaderProps {
  user: UserDetail;
}

const ProfileSubHeader = ({ user }: ProfileSubHeaderProps) => {
  const { countFriends = 0, firstName, lastName, job } = user;

  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="flex items-end justify-between py-3">
      <div className="hidden md:flex flex-col flex-1">
        <span className="font-montserrat text-[25.6px] font-semibold">
          {formatNumber(countFriends)}
        </span>
        <span className="text-neutral-100 text-4xs uppercase">Friends</span>
      </div>

      <div className="text-center flex-1 md:pt-0 pt-12">
        <h2 className="font-semibold font-montserrat text-xl">{fullName}</h2>
        <span className="font-roboto text-neutral-100 text-sm">{job}</span>
      </div>

      <div className="hidden md:flex justify-end flex-1">
        <Button className="flex items-center gap-1 border border-gray-900">
          <Clock size={16} />
          History
        </Button>
      </div>
    </div>
  );
};

export default ProfileSubHeader;
