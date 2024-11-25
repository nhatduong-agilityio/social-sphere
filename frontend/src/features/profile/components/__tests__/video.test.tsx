import { render } from '@testing-library/react';

// Utils
import { convertSecondsToMinutes } from '@/utils';

// Mocks
import { MOCK_VIDEOS } from '@/__mocks__/user';

// Components
import { Video } from '../video';

describe('Video Component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Video
        thumbnail={MOCK_VIDEOS[0].thumbnail}
        videoSrc={MOCK_VIDEOS[0].videoSrc}
        duration={convertSecondsToMinutes(MOCK_VIDEOS[0].duration)}
        alt="Video"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
