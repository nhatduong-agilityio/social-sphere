// Types
import { DispatchProps } from '~/types/common';

// Constants
import { DELETE_USER } from '~/constants/action';

/**
 * Handle request delete data from action
 * @param dispatch dispatch props
 * @returns function handle delete and pass response to reducer
 */
export const requestDeleteUser = (dispatch: DispatchProps<number>) => (idUser: number) => {
  dispatch({ type: DELETE_USER.PENDING });

  try {
    // Call to helper remove data by id
    return dispatch({ type: DELETE_USER.SUCCESS, payload: { id: idUser } });
  } catch (error: Error | unknown) {
    return dispatch({ type: DELETE_USER.FAILURE, payload: { error } });
  }
};
