import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { LoginForm } from '../login-form';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [null, jest.fn()],
}));

describe('LoginForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<LoginForm />);

    expect(container).toMatchSnapshot();
  });

  it('handle form submission', async () => {
    const { getByPlaceholderText, getByRole, getByTitle } = render(
      <LoginForm />,
    );

    const emailInput = getByPlaceholderText('jennadavis@gmail.com');
    const passwordInput = getByTitle('password');
    const loginButton = getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'jennadavis@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1@Dzxvb' } });

    await userEvent.click(loginButton);

    expect(emailInput).toHaveValue('jennadavis@gmail.com');
    expect(passwordInput).toHaveValue('1@Dzxvb');
  });
});
