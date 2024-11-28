import { render, screen } from '@testing-library/react';
import { StoryMeta } from '../story-meta';

describe('StoryMeta', () => {
  const mockProps = {
    title: 'Test Story',
    description: 'Test Description',
  };

  it('matches snapshot', () => {
    const { container } = render(<StoryMeta {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders title and description', () => {
    render(<StoryMeta {...mockProps} />);
    expect(screen.getByText('Test Story')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('matches snapshot without description', () => {
    const { container } = render(<StoryMeta title="Test Story" />);
    expect(container).toMatchSnapshot();
  });

  it('renders with long text', () => {
    const longProps = {
      title: 'Very Long Story Title That Might Wrap',
      description:
        'A very long description that might need to wrap to multiple lines',
    };
    const { container } = render(<StoryMeta {...longProps} />);
    expect(container).toMatchSnapshot();
  });
});
