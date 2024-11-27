import { Camera } from 'lucide-react';

// Components
import { Photo } from './photo';
import { Panel } from '@/components/sections';
import { getPhotoListByUsername } from '../actions/photo-profile';

// APIs

interface IPhotoPanelProps {
  username: string;
}

export const PhotoPanel = async ({ username }: IPhotoPanelProps) => {
  const photos = await getPhotoListByUsername(username);

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
