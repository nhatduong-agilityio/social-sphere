import { UserDetail } from './user';

export type TAuthResponse = {
  user: UserDetail;
  jwt: string;
};
