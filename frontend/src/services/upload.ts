import { apiClient } from './api';

// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import { IUploadResponse } from '@/types';

export const upload = async (file: File) => {
  const formData = new FormData();
  formData.append('files', file);

  const response = await apiClient.post<IUploadResponse[]>({
    path: API_ENDPOINT.UPLOAD,
    body: formData,
    isUpload: true,
  });

  return response[0].url || '';
};
