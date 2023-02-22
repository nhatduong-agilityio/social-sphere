// Services
import { readFromCache, writeToCache } from '~/services/cache';

// Types
import { IUser } from '~/types/user';

// Function helper update data in local storage
export const updateStorage = (data: IUser) => {
  // Retrieve the object
  const dataCurrents = readFromCache('users');

  const index = dataCurrents.findIndex((dataCurrent: IUser) => dataCurrent.id === data.id);

  if (index >= 0) {
    dataCurrents[index] = data;
    writeToCache('users', dataCurrents);
  }

  return dataCurrents;
};

// Function helper delete data by id in local storage
export const removeStorage = (id: number) => {
  // Retrieve the object
  const dataCurrents = readFromCache('users');

  const newData = dataCurrents.filter((dataCurrent: IUser) => dataCurrent.id !== id);

  writeToCache('users', newData);

  return newData;
};
