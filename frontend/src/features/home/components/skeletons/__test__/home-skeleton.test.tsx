import { render } from '@testing-library/react';
import { HomeSkeleton } from '../home-skeleton';

describe('HomeSkeleton', () => {
  it('matches snapshot', () => {
    const { container } = render(<HomeSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
