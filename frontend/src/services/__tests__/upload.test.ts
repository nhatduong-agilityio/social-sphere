import { apiClient } from '../api';
import { upload } from '../upload';

// Types
import { IUploadResponse } from '@/types';

jest.mock('../api', () => ({
  apiClient: {
    post: jest.fn(),
  },
}));

describe('upload service', () => {
  const mockFile = new File(['mock content'], 'mock-file.jpg', {
    type: 'image/jpeg',
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should upload a file and return the file URL', async () => {
    const mockUploadResponse: IUploadResponse[] = [
      { url: 'https://example.com/mock-file.jpg' },
    ];

    (apiClient.post as jest.Mock).mockResolvedValue(mockUploadResponse);

    const result = await upload(mockFile);

    expect(result).toBe('https://example.com/mock-file.jpg');

    expect(apiClient.post).toHaveBeenCalled();
  });

  it('should return an empty string if the response URL is not available', async () => {
    const mockUploadResponse: IUploadResponse[] = [
      {
        url: '',
      },
    ];

    (apiClient.post as jest.Mock).mockResolvedValue(mockUploadResponse);

    const result = await upload(mockFile);

    expect(result).toBe('');

    expect(apiClient.post).toHaveBeenCalled();
  });

  it('should throw an error if upload fails', async () => {
    const errorMessage = 'Upload failed';
    (apiClient.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(upload(mockFile)).rejects.toThrowError(errorMessage);

    expect(apiClient.post).toHaveBeenCalled();
  });
});
