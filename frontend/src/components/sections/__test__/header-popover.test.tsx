import { render, screen, fireEvent } from '@testing-library/react';
import { HeaderPopover } from '../header-popover';
import * as authActions from '@/features/auth/actions';

jest.mock('@/features/auth/actions', () => ({
  logout: jest.fn(),
}));

describe('HeaderPopover Component', () => {
  const defaultProps = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
  };

  it('renders user full name', () => {
    render(<HeaderPopover {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders theme switch', () => {
    render(<HeaderPopover {...defaultProps} />);
    expect(screen.getByTestId('theme-switch')).toBeInTheDocument();
  });

  it('handles logout click', async () => {
    const logoutSpy = jest.spyOn(authActions, 'logout');
    render(<HeaderPopover {...defaultProps} />);
    const logoutButton = screen.getByText('Log out');

    await fireEvent.click(logoutButton);
    expect(logoutSpy).toHaveBeenCalled();
    logoutSpy.mockRestore();
  });

  it('renders logout description', () => {
    render(<HeaderPopover {...defaultProps} />);
    expect(screen.getByText('Log out from your account.')).toBeInTheDocument();
  });

  it('links to user profile', () => {
    render(<HeaderPopover {...defaultProps} />);
    const profileLink = screen.getByText('John Doe').closest('a');
    expect(profileLink).toHaveAttribute(
      'href',
      '/user-profile/johndoe/main-profile',
    );
  });

  it('matches snapshot', () => {
    const { container } = render(<HeaderPopover {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
