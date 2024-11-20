// Utils
import { GroupDetail } from '@/types';
import { UploadBannerGroup } from './upload-banner-group';

interface GroupHeaderProps {
  group: GroupDetail;
}

export const GroupHeader = ({ group }: GroupHeaderProps) => (
  <div className="flex flex-col items-center justify-center relative">
    <UploadBannerGroup group={group} />
  </div>
);
