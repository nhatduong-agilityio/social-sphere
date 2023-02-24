// Types
import { DispatchProps } from '~/types/common';

// Constants
import { DELETE } from '~/constants/action';

/**
 * Handle request delete data from action
 * @param dispatch dispatch props
 * @returns function handle delete and pass response to reducer
 */
export const requestDeleteUser = (dispatch: DispatchProps<number>) => (idUser: number) => {
  try {
    // Call to helper remove data by id
    return dispatch({ type: DELETE, payload: idUser });
  } catch (error: Error | unknown) {
    return alert(error);
  }
};
