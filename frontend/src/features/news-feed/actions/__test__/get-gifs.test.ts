import { getGifs } from '../get-gifs';

describe('getGifs', () => {
  const mockGifResponse = {
    results: [
      {
        id: '1',
        title: 'Test Gif',
        media_formats: {
          gif: {
            url: 'http://example.com/gif1.gif',
          },
        },
      },
      {
        id: '2',
        title: 'Another Gif',
        media_formats: {
          gif: {
            url: 'http://example.com/gif2.gif',
          },
        },
      },
    ],
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should fetch gifs successfully with query params', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockGifResponse),
    });

    const result = await getGifs('happy');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/tenor-proxy?query=happy'),
      expect.any(Object),
    );
    expect(result).toEqual({ data: mockGifResponse.results });
  });

  it('should fetch gifs successfully without query params', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockGifResponse),
    });

    const result = await getGifs();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/tenor-proxy?query='),
      expect.any(Object),
    );
    expect(result).toEqual({ data: mockGifResponse.results });
  });

  it('should handle fetch errors with custom message', async () => {
    const mockError = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await getGifs('happy');

    expect(result).toEqual({
      error: 'Network error',
    });
  });

  it('should handle fetch errors without message', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce({});

    const result = await getGifs('happy');

    expect(result).toEqual({
      error: 'Failed to fetch gifs. Please try again.',
    });
  });
});
