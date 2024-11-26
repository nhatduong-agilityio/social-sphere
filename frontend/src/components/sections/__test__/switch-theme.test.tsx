import { render, screen, fireEvent } from '@testing-library/react';
import { SwitchTheme } from '../switch-theme';
import { useSetTheme } from '@/hooks';

jest.mock('@/hooks', () => ({
  useSetTheme: jest.fn(),
}));

describe('SwitchTheme Component', () => {
  const mockUseSetTheme = {
    isDarkTheme: false,
    toggleTheme: jest.fn(),
    mounted: true,
  };

  beforeEach(() => {
    (useSetTheme as jest.Mock).mockReturnValue(mockUseSetTheme);
  });

  it('renders switch when mounted', () => {
    render(<SwitchTheme />);
    expect(screen.getByTestId('theme-switch')).toBeInTheDocument();
  });

  it('does not render when not mounted', () => {
    (useSetTheme as jest.Mock).mockReturnValue({
      ...mockUseSetTheme,
      mounted: false,
    });
    const { container } = render(<SwitchTheme />);
    expect(container).toBeEmptyDOMElement();
  });

  it('toggles theme on switch change', () => {
    render(<SwitchTheme />);
    const themeSwitch = screen.getByTestId('theme-switch');
    fireEvent.click(themeSwitch);
    expect(mockUseSetTheme.toggleTheme).toHaveBeenCalled();
  });

  it('displays correct icon based on theme', () => {
    (useSetTheme as jest.Mock).mockReturnValue({
      ...mockUseSetTheme,
      isDarkTheme: true,
    });

    render(<SwitchTheme />);
    expect(screen.getByTestId('theme-switch')).toBeInTheDocument();
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<SwitchTheme />);
    expect(container).toMatchSnapshot();
  });
});
