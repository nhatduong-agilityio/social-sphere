import { fireEvent, render } from '@testing-library/react';

// Mocks
import { MOCK_PHOTOS } from '@/__mocks__/user';

// Components
import { Photo } from '../photo';

describe('Photo Component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Photo src={MOCK_PHOTOS[0].src} alt={MOCK_PHOTOS[0].alt} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('handle click photo', () => {
    const { getByTitle } = render(
      <Photo src={MOCK_PHOTOS[0].src} alt={MOCK_PHOTOS[0].alt} />,
    );

    const photo = getByTitle('photo-button');
    fireEvent.click(photo);

    expect(photo).toHaveClass('bg-red-600');
  });
});
