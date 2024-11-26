import { auth } from '@/auth';
import { apiClient } from '../api';

global.fetch = jest.fn();

// Mock auth function
jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

const mockResponse = { data: 'test' };

describe('apiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call GET method and return data', async () => {
    (auth as jest.Mock).mockResolvedValue({ user: { jwt: 'mock-jwt' } });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await apiClient.get('test-path');

    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should call POST method and return data', async () => {
    const requestBody = JSON.stringify({ test: 'test-body' });

    (auth as jest.Mock).mockResolvedValue({ user: { jwt: 'mock-jwt' } });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await apiClient.post({
      path: 'test-path',
      body: requestBody,
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should call PUT method and return data', async () => {
    const requestBody = JSON.stringify({ test: 'test-body' });

    (auth as jest.Mock).mockResolvedValue({ user: { jwt: 'mock-jwt' } });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await apiClient.put('test-path', requestBody);

    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should call DELETE method and return data', async () => {
    (auth as jest.Mock).mockResolvedValue({ user: { jwt: 'mock-jwt' } });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await apiClient.remove('test-path');

    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should throw error when fetch fails', async () => {
    const errorMessage = 'Error: Not Found';
    (auth as jest.Mock).mockResolvedValue({ user: { jwt: 'mock-jwt' } });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: errorMessage,
    });

    await expect(apiClient.get('test-path')).rejects.toThrowError(errorMessage);
  });
});
