import { apiClient } from './api';

// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import { IUploadResponse } from '@/types';

export const upload = async (file: File) => {
  const formData = new FormData();
  formData.append('files', file);

  const response = await apiClient.post<IUploadResponse[]>(
    API_ENDPOINT.UPLOAD,
    formData,
    { headers: {} },
  );

  return response[0].url || '';
};
