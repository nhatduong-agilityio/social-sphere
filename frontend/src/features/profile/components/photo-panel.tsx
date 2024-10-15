import { Camera } from 'lucide-react';

// Mocks
import { MOCK_PHOTOS } from '@/__mocks__/user';

// Components
import Photo from './photo';
import Panel from '@/components/sections/panel';

const PhotoPanel = () => {
  const renderListPhotos = MOCK_PHOTOS.map((photo) => (
    <Photo key={photo.id} src={photo.src} alt={photo.alt} />
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

export default PhotoPanel;
