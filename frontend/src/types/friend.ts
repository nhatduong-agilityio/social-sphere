import { TFollowed, TFriendModel } from '@/models';

export type TFriends = { data: TFriendModel[] };

export type TNewFriends = { id: number; followed: TFollowed };
