import { render, screen, fireEvent } from '@testing-library/react';
import { Banner } from '../banner';
import { IMAGES } from '@/constants';

describe('Banner Component', () => {
  it('renders with default image', () => {
    render(<Banner />);
    const image = screen.getByAltText(IMAGES.PROFILE_BANNER.alt);
    expect(image).toHaveAttribute('src');
  });

  it('renders with custom image', () => {
    const customImageUrl = '/custom-image.jpg';
    render(<Banner imageUrl={customImageUrl} />);
    const image = screen.getByAltText(IMAGES.PROFILE_BANNER.alt);
    expect(image).toHaveAttribute(
      'src',
      'http://localhost/_next/image?url=%2Fcustom-image.jpg&w=3840&q=100',
    );
  });

  it('handles image error by showing fallback', () => {
    render(<Banner />);
    const image = screen.getByAltText(IMAGES.PROFILE_BANNER.alt);
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', IMAGES.PROFILE_BANNER_FALLBACK.url);
  });

  it('handles click on edit button', () => {
    const handleClick = jest.fn();
    render(<Banner onClick={handleClick} />);
    const editButton = screen.getByText('Edit cover image');
    fireEvent.click(editButton);
    expect(handleClick).toHaveBeenCalled();
  });

  it('shows edit button text on hover', () => {
    render(<Banner />);
    const editText = screen.getByText('Edit cover image');
    expect(editText).toHaveClass('opacity-0', 'group-hover:opacity-100');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Banner imageUrl="/test-image.jpg" onClick={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });
});
