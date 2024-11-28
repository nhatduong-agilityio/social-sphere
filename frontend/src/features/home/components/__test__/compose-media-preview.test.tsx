import { render, screen, fireEvent } from '@testing-library/react';
import { ComposeMediaPreview } from '../compose-media-preview';

describe('ComposeMediaPreview', () => {
  const defaultProps = {
    imageUrl: 'https://example.com/test.jpg',
  };

  it('renders media image correctly', () => {
    const { container } = render(<ComposeMediaPreview {...defaultProps} />);

    const image = screen.getByAltText('Media of feed');
    expect(image).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders remove button when onRemove prop is provided', () => {
    const onRemove = jest.fn();
    render(<ComposeMediaPreview {...defaultProps} onRemove={onRemove} />);

    const removeButton = screen.getByRole('button');
    expect(removeButton).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(<ComposeMediaPreview {...defaultProps} onRemove={onRemove} />);

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('does not render remove button when onRemove is not provided', () => {
    render(<ComposeMediaPreview {...defaultProps} />);

    const removeButton = screen.queryByRole('button');
    expect(removeButton).not.toBeInTheDocument();
  });
});
