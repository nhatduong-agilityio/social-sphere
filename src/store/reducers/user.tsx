import { FETCH_USERS } from '~/constant/action';
import { IStates, PayloadProps } from '~/types/common';
import { IUser } from '~/types/user';

// Initial state users
const initUserState: IStates<IUser> = {
  isPending: false,
  isSuccess: false,
  isFailure: false,
  data: [] as IUser[] | undefined,
};

// Users reducer
const usersReducer = (
  state: IStates<IUser>,
  action: { type: string; payload?: PayloadProps<IUser> },
) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USERS.PENDING:
      return {
        ...state,
        isPending: true,
        isSuccess: false,
        isFailure: false,
      };
    case FETCH_USERS.SUCCESS:
      return {
        ...state,
        isPending: false,
        isSuccess: true,
        isFailure: false,
        data: payload?.response?.data,
      };
    case FETCH_USERS.FAILURE:
      return {
        ...state,
        isPending: false,
        isSuccess: false,
        isFailure: true,
      };
    default:
      return state;
  }
};

export { usersReducer, initUserState };
