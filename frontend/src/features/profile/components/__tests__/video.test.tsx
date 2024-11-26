import { fireEvent, render } from '@testing-library/react';

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

  it('handle click video', () => {
    const { getByTitle } = render(
      <Video
        thumbnail={MOCK_VIDEOS[0].thumbnail}
        videoSrc={MOCK_VIDEOS[0].videoSrc}
        duration={convertSecondsToMinutes(MOCK_VIDEOS[0].duration)}
        alt="Video"
      />,
    );

    const video = getByTitle('video-button');
    fireEvent.click(video);

    expect(video).toHaveClass('bg-red-600');
  });
});
