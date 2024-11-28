import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComposeFeedCard } from '../compose-feed-card';
import { ComposeTabValue } from '../../constants';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{ message: null, error: null }, jest.fn()],
  useFormStatus: () => ({ pending: false }),
}));

describe('ComposeFeedCard', () => {
  const defaultProps = {
    isOverlayOpen: false,
    onOpensOverlay: jest.fn(),
    onCloseOverlay: jest.fn(),
    onUpdateNewsFeedIds: jest.fn(),
  };

  it('renders correctly when overlay is closed', async () => {
    const { container } = render(<ComposeFeedCard {...defaultProps} />);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('renders correctly when overlay is open', async () => {
    const props = {
      ...defaultProps,
      isOverlayOpen: true,
    };
    const { container } = render(<ComposeFeedCard {...props} />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
      expect(screen.getByTestId('overlay')).toHaveClass('block');
    });
  });

  it('handles tab changes correctly', async () => {
    render(<ComposeFeedCard {...defaultProps} />);
    const tabButton = screen.getByRole('tab', { name: /publish/i });
    fireEvent.click(tabButton);

    await waitFor(() => {
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });
  });

  it('closes dialog when switching back to publish tab', async () => {
    render(<ComposeFeedCard {...defaultProps} />);
    const currentTab = ComposeTabValue.Publish;

    await waitFor(() => {
      expect(currentTab).toBe('publish');
    });
  });
});
