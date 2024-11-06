import { Camera } from 'lucide-react';

// Components
import { Photo } from './photo';
import { Panel } from '@/components/sections';

// APIs
import { getPhotoListByUserId } from '@/api/photo-profile/route';

interface IPhotoPanelProps {
  userId: string;
}

export const PhotoPanel = async ({ userId }: IPhotoPanelProps) => {
  const photos = await getPhotoListByUserId(userId);

  const renderListPhotos = photos.map(({ id, media }) => (
    <Photo key={id} src={media} alt={media} />
  ));

  return (
    <Panel
      panelTile="Photos"
      buttonLabel="Albums"
      startIcon={<Camera />}
      countItems={0}
    >
      <div className="flex flex-wrap gap-6">{renderListPhotos}</div>
    </Panel>
  );
};
