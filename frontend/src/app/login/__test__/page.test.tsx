import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

// Components
import LoginPage from '../page';

describe('LoginPage', () => {
  it('Renders a heading', () => {
    const { container } = render(<LoginPage />);

    expect(container).toMatchSnapshot();
  });
});
