import { IUser } from '~/types/user';
import { client } from '.';

export const updateUserService = async (url: string, data: IUser) => {
  return await client.put(`${url}/${data.id}`, {
    name: data.name,
    avatar: data.avatar,
    location: data.location,
    orderDate: data.orderDate,
    status: data.status,
    netAmount: data.netAmount,
  });
};
