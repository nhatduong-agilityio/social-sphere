// Types
import { DispatchProps } from '~/types/common';
import { IUser } from '~/types/user';

// Constants
import { FETCH_USERS } from '~/constants/action';

// Store
import customers from '~/store/data';

/**
 * Handle request fetch data from action
 * @param dispatch dispatch props
 * @returns call to function fetch data and return response to reducer
 */
export const fetchRequest = (dispatch: DispatchProps<IUser>) => {
  dispatch({ type: FETCH_USERS.PENDING });

  try {
    return dispatch({ type: FETCH_USERS.SUCCESS, payload: { response: customers } });
  } catch (error: Error | unknown) {
    return dispatch({ type: FETCH_USERS.FAILURE, payload: { error } });
  }
};
