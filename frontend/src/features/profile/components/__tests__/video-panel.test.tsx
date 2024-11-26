import { render } from '@testing-library/react';

// Components
import { VideoPanel } from '../video-panel';

describe('VideoPanel Component', () => {
  it('should render correctly', () => {
    const { container } = render(<VideoPanel />);

    expect(container).toMatchSnapshot();
  });
});
