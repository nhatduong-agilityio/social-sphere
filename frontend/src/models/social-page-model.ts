import { UserModel } from './user-model';

export type SocialPageModel = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  owner: UserModel;
};
