// Constants
import { DELETE_USER, FETCH_USERS, UPDATE_USER } from '~/constants/action';

// Services

// Types
import { IStates, PayloadProps } from '~/types/common';
import { IUser } from '~/types/user';

// Initial state users
const initUserState: IStates<IUser> = {
  data: [] as IUser[],
};

// Users reducer
const usersReducer = (
  state: IStates<IUser>,
  action: { type: string; payload?: PayloadProps<IUser> },
) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USERS: {
      return {
        ...state,
        data: payload?.response,
      };
    }
    case UPDATE_USER: {
      let dataUpdate = {} as IUser;

      if (payload?.response) {
        dataUpdate = payload.response[0];
      }

      return {
        ...state,
        data: state.data?.map((data) => {
          if (data.id === dataUpdate.id) {
            return dataUpdate;
          } else {
            return data;
          }
        }),
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        data: state.data?.filter((data) => data.id !== payload?.id),
      };
    }
    default: {
      return state;
    }
  }
};

export { usersReducer, initUserState };
