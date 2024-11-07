import { auth } from '@/auth';

import { BASE_URL } from '@/constants';

const headers = {
  'Content-Type': 'application/json',
};

const getHeaders = async () => {
  const { user } = (await auth()) ?? {};
  const jwt: string | undefined = user?.jwt;

  return { ...headers, ...(jwt && { Authorization: `Bearer ${jwt}` }) };
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

const fetchData = async <T>(
  path: string,
  options: RequestInit,
  isUpload: boolean = false,
): Promise<T> => {
  const headers = isUpload ? {} : await getHeaders();

  const optionConfig: RequestInit = {
    headers,
    ...options,
  };

  const response = await fetch(path, optionConfig);

  return await handleResponse<T>(response);
};

export const get = async <T>(
  path: string,
  configOptions?: RequestInit,
): Promise<T> => {
  const url = `${BASE_URL}/${path}`;

  const options: RequestInit = {
    method: 'GET',
    ...configOptions,
  };

  return fetchData<T>(url, options);
};

export const post = async <T>({
  path,
  body,
  isUpload = false,
  configOptions = {},
}: {
  path: string;
  body: BodyInit;
  isUpload?: boolean;
  configOptions?: RequestInit;
}): Promise<T> => {
  const url = `${BASE_URL}/${path}`;

  const options: RequestInit = {
    method: 'POST',
    body,
    ...configOptions,
  };

  return fetchData<T>(url, options, isUpload);
};

export const put = async <T>(
  path: string,
  body: BodyInit,
  configOptions?: RequestInit,
): Promise<T> => {
  const url = `${BASE_URL}/${path}`;

  const options: RequestInit = {
    method: 'PUT',
    body,
    ...configOptions,
  };

  return fetchData<T>(url, options);
};

export const remove = async <T>(
  path: string,
  configOptions?: RequestInit,
): Promise<T> => {
  const url = `${BASE_URL}/${path}`;

  const options: RequestInit = {
    method: 'DELETE',
    ...configOptions,
  };

  return fetchData<T>(url, options);
};

const apiClient = { get, post, put, remove };

export { apiClient };
