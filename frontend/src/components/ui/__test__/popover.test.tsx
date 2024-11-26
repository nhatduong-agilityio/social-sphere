import { render, screen, fireEvent } from '@testing-library/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverContainer,
} from '../popover';

describe('Popover Components', () => {
  it('renders PopoverContainer with trigger and content', () => {
    render(
      <PopoverContainer
        trigger={<button data-testid="trigger-button">Click me</button>}
        content={<div data-testid="popover-content">Content</div>}
        contentClassName="custom-content-class"
      />,
    );

    expect(screen.getByTestId('trigger-button')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('trigger-button'));
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
  });

  it('renders individual Popover components correctly', () => {
    render(
      <Popover>
        <PopoverTrigger data-testid="trigger">
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverContent data-testid="content" className="test-class">
          <p>Content</p>
        </PopoverContent>
      </Popover>,
    );

    expect(screen.getByTestId('trigger')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies custom className to PopoverContent', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open</button>
        </PopoverTrigger>
        <PopoverContent className="custom-class" data-testid="content">
          Content
        </PopoverContent>
      </Popover>,
    );

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByTestId('content')).toHaveClass('custom-class');
  });

  it('renders with different align props', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open</button>
        </PopoverTrigger>
        <PopoverContent align="start" data-testid="content">
          Content
        </PopoverContent>
      </Popover>,
    );

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('renders with custom sideOffset', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open</button>
        </PopoverTrigger>
        <PopoverContent sideOffset={20} data-testid="content">
          Content
        </PopoverContent>
      </Popover>,
    );

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
