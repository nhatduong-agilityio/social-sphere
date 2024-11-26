import { render } from '@testing-library/react';
import { MainNotFound } from '../main-not-found';

describe('MainNotFound Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<MainNotFound />);
    expect(container).toMatchSnapshot();
  });
});
