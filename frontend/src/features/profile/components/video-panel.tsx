import { Camera } from 'lucide-react';

// Mocks
import { MOCK_VIDEOS } from '@/__mocks__/user';

// Components
import { Panel } from '@/components/sections';
import { Video } from './video';

// Utils
import { convertSecondsToMinutes } from '@/utils';

export const VideoPanel = () => {
  const renderListVideos = MOCK_VIDEOS.map(
    ({ id, thumbnail, duration, videoSrc, alt }) => (
      <Video
        key={id}
        thumbnail={thumbnail}
        videoSrc={videoSrc}
        duration={convertSecondsToMinutes(duration)}
        alt={alt}
      />
    ),
  );

  return (
    <Panel
      panelTile="Videos"
      buttonLabel="All Videos"
      startIcon={<Camera />}
      countItems={0}
    >
      <div className="flex flex-wrap gap-5">{renderListVideos}</div>
    </Panel>
  );
};
