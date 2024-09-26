import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Components
import LoginPage from '../page';

describe('LoginPage', () => {
  it('Renders a heading', () => {
    render(<LoginPage />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
