import { render, screen } from '@testing-library/react';
import { CircleOverlay } from '../circle-overlay';

describe('CircleOverlay Component', () => {
  it('renders children correctly', () => {
    render(
      <CircleOverlay>
        <div data-testid="child">Child content</div>
      </CircleOverlay>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders circle content when provided', () => {
    render(
      <CircleOverlay
        circleContent={<span data-testid="circle-content">Status</span>}
      >
        <div>Child content</div>
      </CircleOverlay>,
    );
    expect(screen.getByTestId('circle-content')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(
      <CircleOverlay>
        <div>Content</div>
      </CircleOverlay>,
    );
    const wrapper = screen.getByTestId('circle-overlay');
    expect(wrapper).toHaveClass('relative w-9 h-9');
  });

  it('applies custom className', () => {
    render(
      <CircleOverlay className="custom-class">
        <div>Content</div>
      </CircleOverlay>,
    );
    const wrapper = screen.getByTestId('circle-overlay');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('applies custom circle className', () => {
    render(
      <CircleOverlay circleClassName="custom-circle-class">
        <div>Content</div>
      </CircleOverlay>,
    );
    const circle = screen.getByTestId('circle');
    expect(circle).toHaveClass('custom-circle-class');
  });

  it('renders with tiny circle size', () => {
    render(
      <CircleOverlay circleSize="tiny">
        <div>Content</div>
      </CircleOverlay>,
    );
    const circle = screen.getByTestId('circle');
    expect(circle).toHaveClass('w-2.5 h-2.5');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <CircleOverlay
        circleContent={<span>Status</span>}
        className="custom-class"
        circleClassName="custom-circle-class"
        circleSize="tiny"
      >
        <div>Child content</div>
      </CircleOverlay>,
    );
    expect(container).toMatchSnapshot();
  });
});
