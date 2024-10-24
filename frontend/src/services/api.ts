import { BASE_URL } from '@/constants';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

const fetchData = async <T>(path: string, options: RequestInit): Promise<T> => {
  const response = await fetch(path, options);

  return await handleResponse<T>(response);
};

export const get = async <T>(
  path: string,
  configOptions?: RequestInit,
): Promise<T> => {
  const url = `${BASE_URL}/${path}`;

  return fetchData<T>(url, configOptions || {});
};

const apiClient = { get };

export { apiClient };
