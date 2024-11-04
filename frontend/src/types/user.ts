import { UserModel } from '@/models';

export type UserDetail = UserModel;

export type IUserResponse = UserDetail & {
  jwt: string;
};

export type IUserRequest = Omit<UserDetail, 'id'>;
