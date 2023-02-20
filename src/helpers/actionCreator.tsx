import { DispatchProps } from '~/types/common';

export interface ObjActions<T> {
  fetch?: (dispatch: DispatchProps<T>) => Promise<void>;
  update?: (dispatch: DispatchProps<T>) => (valueUpdate: T) => Promise<void>;
  delete?: (dispatch: DispatchProps<T>) => (id: number) => Promise<void>;
}

export const bindDispatchToAction = function <T>(
  actions: ObjActions<T>,
  dispatch: DispatchProps<T>,
) {
  return Object.fromEntries(
    Object.entries(actions).map(([key, action]) => [
      key,
      () => {
        return action(dispatch);
      },
    ]),
  );
};
