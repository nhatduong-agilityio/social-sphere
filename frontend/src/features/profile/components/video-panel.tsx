import { Camera } from 'lucide-react';

// Mocks
import { MOCK_VIDEOS } from '@/__mocks__/user';

// Components
import Panel from '@/components/sections/panel';
import Video from './video';
import { convertSecondsToMinutes } from '@/utils/number';

const VideoPanel = () => {
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

export default VideoPanel;
