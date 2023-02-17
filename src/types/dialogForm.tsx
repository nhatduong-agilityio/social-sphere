import { IData } from './data';
import { IUser } from './user';

/**
 * type for dialog state
 */
export type DialogState = {
  open: boolean;
  data: IUser;
};
