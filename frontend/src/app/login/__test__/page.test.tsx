import { render, screen } from '@testing-library/react';
import LoginPage from '../page';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [null, jest.fn()],
  useFormStatus: () => ({ pending: false }),
}));

describe('LoginPage', () => {
  it('renders login page with form', () => {
    render(<LoginPage />);

    expect(
      screen.getByPlaceholderText('jennadavis@gmail.com'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('●●●●●●●')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
