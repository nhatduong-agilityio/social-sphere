import { readFromCache, writeToCache } from '~/services/cache';
import { IUser } from '~/types/user';

export const updateStorage = (data: IUser) => {
  //Retrieve the object
  const dataCurrents = readFromCache('users');
  //Change the username property

  const index = dataCurrents.findIndex((dataCurrent: IUser) => dataCurrent.id === data.id);

  if (index >= 0) {
    dataCurrents[index] = data;
    writeToCache('users', dataCurrents);
  }

  return dataCurrents;
};

export const removeStorage = (id: number) => {
  //Retrieve the object
  const dataCurrents = readFromCache('users');
  //Change the username property

  const newData = dataCurrents.filter((dataCurrent: IUser) => dataCurrent.id !== id);

  writeToCache('users', newData);

  return newData;
};
