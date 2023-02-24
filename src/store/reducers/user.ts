// Constants
import { DELETE, FETCH, UPDATE } from '~/constants/action';

// Services

// Types
import { Actions, IStates } from '~/types/common';
import { IUser } from '~/types/user';

// Initial state users
const initUserState: IStates<IUser> = {
  data: [] as IUser[],
};

// Users reducer
const usersReducer = (state: IStates<IUser>, action: Actions<IUser>) => {
  switch (action.type) {
    case FETCH: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case UPDATE: {
      return {
        ...state,
        data: state.data?.map((data) => {
          if (data.id === action.payload.id) {
            return action.payload;
          } else {
            return data;
          }
        }),
      };
    }
    case DELETE: {
      return {
        ...state,
        data: state.data?.filter((data) => data.id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
};

export { usersReducer, initUserState };
