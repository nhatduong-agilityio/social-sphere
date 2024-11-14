import { UserModel } from './user-model';

export type TFollowed = UserModel & {
  followedRelationships: Array<{ id: number }>;
};

export type TFollower = {
  id: number;
  documentId: string;
  follower: UserModel & {
    followedRelationships: Array<{ id: number }>;
  };
};

export type TFriendModel = {
  id: number;
  documentId: string;
  followed: TFollowed;
  follower: TFollowed;
};
