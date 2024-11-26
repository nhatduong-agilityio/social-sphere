import { render } from '@testing-library/react';
import { PostSkeleton } from '../post-skeleton';

describe('PostSkeleton Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<PostSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
