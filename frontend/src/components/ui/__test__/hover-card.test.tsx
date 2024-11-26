import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../hover-card';

describe('HoverCard Component', () => {
  const renderHoverCard = () =>
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Hover content</HoverCardContent>
      </HoverCard>,
    );

  it('renders trigger element correctly', () => {
    renderHoverCard();
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows content on hover', async () => {
    const user = userEvent.setup();
    renderHoverCard();
    const trigger = screen.getByText('Hover me');

    await user.hover(trigger);
    await waitFor(() => {
      expect(
        screen.getByText('Hover content', { ignore: '[role="tooltip"]' }),
      ).toBeInTheDocument();
    });
  });

  it('applies custom className to content', async () => {
    const user = userEvent.setup();
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent className="custom-class">
          Hover content
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByText('Hover me');
    await user.hover(trigger);

    await waitFor(() => {
      const content = screen.getByText('Hover content', {
        ignore: '[role="tooltip"]',
      });
      expect(content.closest('[class*="custom-class"]')).toBeInTheDocument();
    });
  });
});
