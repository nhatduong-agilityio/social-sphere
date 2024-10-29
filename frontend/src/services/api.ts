import { BASE_URL } from '@/constants';

const headers = {
  'Content-Type': 'application/json',
};

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

export const post = async <T>(
  path: string,
  body: BodyInit,
  configOptions?: RequestInit,
): Promise<T> => {
  const url = `${BASE_URL}/${path}`;

  const options: RequestInit = {
    method: 'POST',
    headers,
    body,
    ...configOptions,
  };

  return fetchData<T>(url, options);
};

const apiClient = { get, post };

export { apiClient };
