import { render, screen, fireEvent } from '@testing-library/react';
import { Panel } from '../panel';
import { Users } from 'lucide-react';

describe('Panel Component', () => {
  const defaultProps = {
    panelTile: 'Test Panel',
    buttonLabel: 'Add Item',
    countItems: 5,
    children: <div data-testid="panel-content">Panel Content</div>,
    handleClick: jest.fn(),
    startIcon: <Users data-testid="start-icon" />,
  };

  it('renders panel title correctly', () => {
    render(<Panel {...defaultProps} />);
    expect(screen.getByText('Test Panel')).toBeInTheDocument();
  });

  it('displays correct button label', () => {
    render(<Panel {...defaultProps} />);
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  it('shows count items badge when count > 0', () => {
    render(<Panel {...defaultProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not show count badge when count is 0', () => {
    render(<Panel {...defaultProps} countItems={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('handles button click correctly', () => {
    render(<Panel {...defaultProps} />);
    const button = screen.getByText('Add Item');
    fireEvent.click(button);
    expect(defaultProps.handleClick).toHaveBeenCalled();
  });

  it('renders start icon when provided', () => {
    render(<Panel {...defaultProps} />);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Panel {...defaultProps} />);
    expect(screen.getByTestId('panel-content')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Panel {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
