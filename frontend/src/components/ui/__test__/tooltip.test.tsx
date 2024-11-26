import { render, screen, waitFor } from '@testing-library/react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '../tooltip';
import userEvent from '@testing-library/user-event';

describe('Tooltip Components', () => {
  it('renders tooltip structure correctly', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger data-testid="trigger">Hover me</TooltipTrigger>
          <TooltipContent data-testid="content">Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByTestId('trigger')).toBeInTheDocument();
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('applies custom className to TooltipContent', async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent className="custom-class" data-testid="content">
            Content
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    const trigger = screen.getByText('Hover me');

    await user.hover(trigger);
    await waitFor(() => {
      const content = screen.getByTestId('content');
      expect(content).toBeInTheDocument();
      expect(screen.getByTestId('content')).toHaveClass('custom-class');
    });
  });
});
