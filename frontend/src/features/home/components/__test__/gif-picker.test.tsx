import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GifPicker } from '../gif-picker';
import { getGifs } from '../../actions';

jest.mock('../../actions', () => ({
  getGifs: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useFocusState: jest.fn(() => ({
    isFocused: true,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  })),
  useDebounce: jest.fn((value) => value),
}));

const MOCK_GIFS = [
  {
    id: '1',
    content_description: 'Funny cat',
    media_formats: {
      gif: {
        url: 'https://example.com/cat.gif',
      },
    },
  },
  {
    id: '2',
    content_description: 'Dancing dog',
    media_formats: {
      gif: {
        url: 'https://example.com/dog.gif',
      },
    },
  },
];

describe('GifPicker', () => {
  const mockProps = {
    onGifSelect: jest.fn(),
    onCloseGifPicker: jest.fn(),
  };

  beforeEach(() => {
    (getGifs as jest.Mock).mockResolvedValue({ data: MOCK_GIFS });
  });

  it('matches snapshot with initial state', () => {
    const { container } = render(<GifPicker {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders search input and handles search', async () => {
    render(<GifPicker {...mockProps} />);

    const searchInput = screen.getByPlaceholderText('Search a GIF to add');
    fireEvent.change(searchInput, { target: { value: 'cat' } });

    await waitFor(() => {
      expect(getGifs).toHaveBeenCalledWith('cat');
    });
  });

  it('displays gif grid when results are available', async () => {
    render(<GifPicker {...mockProps} />);

    const searchInput = screen.getByPlaceholderText('Search a GIF to add');
    fireEvent.change(searchInput, { target: { value: 'cat' } });

    await waitFor(() => {
      MOCK_GIFS.forEach((gif) => {
        expect(
          screen.getByAltText(gif.content_description),
        ).toBeInTheDocument();
      });
    });
  });

  it('calls onGifSelect when a gif is clicked', async () => {
    render(<GifPicker {...mockProps} />);

    const searchInput = screen.getByPlaceholderText('Search a GIF to add');
    fireEvent.change(searchInput, { target: { value: 'cat' } });

    await waitFor(() => {
      const firstGif = screen.getByAltText(MOCK_GIFS[0].content_description);
      fireEvent.click(firstGif);
      expect(mockProps.onGifSelect).toHaveBeenCalledWith(
        MOCK_GIFS[0].media_formats.gif.url,
      );
    });
  });
});
