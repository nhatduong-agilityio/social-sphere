import { getLocations } from '../get-locations';

describe('getLocations', () => {
  const mockMapboxResponse = {
    features: [
      {
        id: '1',
        place_name: 'New York, USA',
        center: [-74.006, 40.7128],
      },
      {
        id: '2',
        place_name: 'New Jersey, USA',
        center: [-74.4057, 40.0583],
      },
    ],
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should fetch locations successfully with query params', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockMapboxResponse),
    });

    const result = await getLocations('New York');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/mapbox-geocoding?query=New%20York'),
      expect.any(Object),
    );
    expect(result).toEqual({ data: mockMapboxResponse });
  });

  it('should handle fetch errors with custom message', async () => {
    const mockError = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await getLocations('New York');

    expect(result).toEqual({
      error: 'Network error',
    });
  });

  it('should handle fetch errors without message', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce({});

    const result = await getLocations('New York');

    expect(result).toEqual({
      error: 'Failed to fetch locations. Please try again.',
    });
  });
});
