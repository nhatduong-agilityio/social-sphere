// Constants
import { DELETE_USER, FETCH_USERS, UPDATE_USER } from '~/constants/action';

// Services

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
      let dataUpdate = {} as IUser;

      if (payload?.response) {
        dataUpdate = payload.response[0];
      }

      return {
        ...state,
        status: 'success',
        data: state.data?.map((data) => {
          if (data.id === dataUpdate.id) {
            return dataUpdate;
          } else {
            return data;
          }
        }),
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
        data: state.data?.filter((data) => data.id !== payload?.id),
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
