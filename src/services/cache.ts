import { IUser } from '~/types/user';

const writeToCache = (key: string, data: IUser[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const readFromCache = (key: string) => JSON.parse(localStorage.getItem(key) || '{}');

export { readFromCache, writeToCache };
