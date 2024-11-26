import { render } from '@testing-library/react';
import { Loading } from '../loading';

describe('Loading Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
