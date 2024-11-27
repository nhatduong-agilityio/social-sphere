import { render } from '@testing-library/react';
import { LoginLayout } from '../login-layout';

describe('LoginLayout Component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <LoginLayout>
        <div>Children Components</div>
      </LoginLayout>,
    );
    expect(container).toMatchSnapshot();
  });
});
