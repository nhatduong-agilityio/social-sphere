// This is special for MockAPI.io Service
const API_NOT_FOUND = 'Not found';

export const isNotFound = (data: unknown) =>
  typeof data === 'string' && data === API_NOT_FOUND;
