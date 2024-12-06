import { render } from '@testing-library/react';
import { FeedSkeleton } from '../feed-skeleton';

describe('FeedSkeleton', () => {
  it('matches snapshot', () => {
    const { container } = render(<FeedSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
