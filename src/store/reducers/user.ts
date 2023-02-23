// Constants
import { DELETE_USER, FETCH_USERS, UPDATE_USER } from '~/constants/action';

// Services
import { writeToCache } from '~/services/cache';

// Types
import { IStates, PayloadProps } from '~/types/common';
import { IUser } from '~/types/user';

// Initial state users
const initUserState: IStates<IUser> = {
  status: 'idle',
  data: [] as IUser[],
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
        status: 'pending',
      };
    case FETCH_USERS.SUCCESS: {
      if (payload?.response) {
        writeToCache('users', payload.response);
      }

      return {
        ...state,
        status: 'success',
        data: payload?.response,
      };
    }
    case FETCH_USERS.FAILURE:
      return {
        ...state,
        status: 'failure',
      };
    case UPDATE_USER.PENDING:
      return {
        ...state,
        status: 'pending',
        data: state.data,
      };
    case UPDATE_USER.SUCCESS: {
      return {
        ...state,
        status: 'success',
        data: payload?.response,
      };
    }
    case UPDATE_USER.FAILURE:
      return {
        ...state,
        status: 'failure',
        data: state.data,
      };
    case DELETE_USER.PENDING:
      return {
        ...state,
        status: 'pending',
        data: state.data,
      };
    case DELETE_USER.SUCCESS: {
      return {
        ...state,
        status: 'success',
        data: payload?.response,
      };
    }
    case DELETE_USER.FAILURE:
      return {
        ...state,
        status: 'failure',
        data: state.data,
      };

    default:
      return state;
  }
};

export { usersReducer, initUserState };
