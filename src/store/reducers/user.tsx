import { DELETE_USER, FETCH_USERS, UPDATE_USER } from '~/constant/action';
import { IStates, PayloadProps } from '~/types/common';
import { IUser } from '~/types/user';

// Initial state users
const initUserState: IStates<IUser> = {
  isPending: false,
  isSuccess: false,
  isFailure: false,
  data: [] as IUser[],
};

// Users reducer
const usersReducer = (
  state: IStates<IUser>,
  action: { type: string; payload?: PayloadProps<IUser> },
) => {
  const { type, payload } = action;

  console.log(type);

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
    case UPDATE_USER.PENDING:
      return {
        ...state,
        isPending: true,
        isSuccess: false,
        isFailure: false,
        data: state.data,
      };
    case UPDATE_USER.SUCCESS: {
      // If data is array then find index by name list.
      const idx = state.data?.findIndex((item: IUser) => item.id === payload?.response?.data.id);

      let currentData: IUser[] = [];

      if (state.data !== undefined) currentData = [...state.data];

      if (idx !== undefined && idx >= 0 && payload?.response !== undefined)
        currentData[idx] = payload.response.data;

      return {
        ...state,
        isPending: false,
        isSuccess: true,
        isFailure: false,
        data: currentData,
      };
    }
    case UPDATE_USER.FAILURE:
      return {
        ...state,
        isPending: false,
        isSuccess: false,
        isFailure: true,
        data: state.data,
      };
    case DELETE_USER.PENDING:
      return {
        ...state,
        isPending: true,
        isSuccess: false,
        isFailure: false,
        data: state.data,
      };
    case DELETE_USER.SUCCESS:
      return {
        ...state,
        isPending: false,
        isSuccess: true,
        isFailure: false,
        data: payload?.data,
      };
    case DELETE_USER.FAILURE:
      return {
        ...state,
        isPending: false,
        isSuccess: false,
        isFailure: true,
        data: state.data,
      };

    default:
      return state;
  }
};

export { usersReducer, initUserState };
