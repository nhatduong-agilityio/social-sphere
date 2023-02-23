import { IUser } from '~/types/user';

/**
 * Function set data for key in local storage
 * @param key string
 * @param data IUser[]
 */
const writeToCache = (key: string, data: IUser[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Function get data by key in local storage
 * @param key string
 * @returns object data
 */
const readFromCache = (key: string) => JSON.parse(localStorage.getItem(key) || '{}');

export { readFromCache, writeToCache };
