import { render } from '@testing-library/react';

// Components
import { ConfirmEmail } from '../confirm-email';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe('ConfirmEmail component', () => {
  it('should render correctly', () => {
    const { container } = render(<ConfirmEmail />);

    expect(container).toMatchSnapshot();
  });

  it('should handle button click', () => {
    const { getByRole } = render(<ConfirmEmail />);

    const button = getByRole('button', { name: 'Let Me In' });

    button.click();

    expect(button).toBeInTheDocument();
  });
});
