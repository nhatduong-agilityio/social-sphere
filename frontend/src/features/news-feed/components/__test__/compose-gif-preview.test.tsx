import { render, screen, fireEvent } from '@testing-library/react';
import { ComposeGifPreview } from '../compose-gif-preview';

describe('ComposeGifPreview', () => {
  const defaultProps = {
    imageUrl: 'https://example.com/test.gif',
  };

  it('renders gif image correctly', () => {
    const { container } = render(<ComposeGifPreview {...defaultProps} />);

    const image = screen.getByAltText('Gif of feed');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', defaultProps.imageUrl);
    expect(container).toMatchSnapshot();
  });

  it('renders remove button when onRemove prop is provided', () => {
    const onRemove = jest.fn();
    render(<ComposeGifPreview {...defaultProps} onRemove={onRemove} />);

    const removeButton = screen.getByRole('button');
    expect(removeButton).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(<ComposeGifPreview {...defaultProps} onRemove={onRemove} />);

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('does not render remove button when onRemove is not provided', () => {
    render(<ComposeGifPreview {...defaultProps} />);

    const removeButton = screen.queryByRole('button');
    expect(removeButton).not.toBeInTheDocument();
  });
});
