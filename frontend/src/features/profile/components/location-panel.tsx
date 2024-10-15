import { Camera } from 'lucide-react';

// Mocks
import { MOCK_LOCATIONS } from '@/__mocks__/user';

// Components
import Panel from '@/components/sections/panel';
import LocationCard from './location-card';

const LocationPanel = () => {
  const renderLocations = MOCK_LOCATIONS.map(
    ({ id, title, src, alt, rating }) => (
      <LocationCard
        key={id}
        title={title}
        src={src}
        alt={alt}
        rating={rating}
      />
    ),
  );

  return (
    <Panel
      panelTile="Places"
      buttonLabel="View All"
      startIcon={<Camera />}
      countItems={0}
    >
      <div className="flex flex-wrap gap-3">{renderLocations}</div>
    </Panel>
  );
};

export default LocationPanel;
