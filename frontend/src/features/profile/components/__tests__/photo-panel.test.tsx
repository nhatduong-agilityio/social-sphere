import { render, waitFor } from '@testing-library/react';

// Components
import { PhotoPanel } from '../photo-panel';

// Mocks
import { MOCK_PHOTOS } from '@/__mocks__/user';

// Mock the API function
jest.mock('../../actions/photo-profile', () => ({
  getPhotoListByUsername: () => MOCK_PHOTOS,
}));

describe('PhotoPanel Component', () => {
  it('should render correctly', async () => {
    const { container } = render(
      await PhotoPanel({ username: 'admin@gmail.com' }),
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
