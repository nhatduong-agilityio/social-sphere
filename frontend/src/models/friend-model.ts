import { UserModel } from './user-model';

export type TFollowed = UserModel & {
  followedRelationships: Array<{ id: number }>;
};

export type TFriendModel = {
  id: number;
  followed: TFollowed;
};
