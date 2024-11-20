import { EditIcon } from 'lucide-react';

// Components
import { Button } from '@/components/ui';
import { UploadBannerGroup } from './upload-banner-group';
import { UploadAvatarGroup } from './upload-avatar-group';

// Types
import { GroupDetail } from '@/types';

// Utils
import { formatNumber } from '@/utils';
import { isGroupAdmin } from '../utils';

interface GroupHeaderProps {
  authorId: string;
  group: GroupDetail;
}

export const GroupHeader = ({ group, authorId }: GroupHeaderProps) => {
  const { name, description, members, author } = group;
  const countMembers = members?.length;

  const isAdmin =
    authorId === author.id.toString() || isGroupAdmin(members, authorId);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center relative">
        <UploadBannerGroup group={group} />
        <UploadAvatarGroup group={group} />
      </div>
      <div className="w-full flex items-start justify-between py-3 mt-[50px]">
        <div className="flex flex-col flex-1">
          <span className="font-montserrat text-[25.6px] font-semibold">
            {formatNumber(countMembers) || '0'}
          </span>
          <span className="text-neutral-100 text-4xs uppercase">Friends</span>
        </div>

        <div className="text-center flex-1">
          <h2 className="font-semibold font-montserrat text-xl">{name}</h2>
          <span className="font-roboto text-neutral-100 text-sm">
            {description}
          </span>
        </div>

        <div className="flex justify-end flex-1">
          <Button
            size="fit"
            variant="unstyle"
            className="flex items-center gap-1 border border-gray-900"
            disabled={!isAdmin}
          >
            <EditIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
