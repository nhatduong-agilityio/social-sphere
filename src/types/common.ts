export type IStates<T> = {
  data?: T[];
};

export type actionTypes = {
  PENDING: 'ACTION_TYPES_PENDING';
  SUCCESS: 'ACTION_TYPES_SUCCESS';
  FAILURE: 'ACTION_TYPES_FAILURE';
};

export type Actions<T> =
  | { type: 'FETCH'; payload: T[] }
  | { type: 'UPDATE'; payload: T }
  | { type: 'DELETE'; payload: number }
  | { type: 'ERROR' };

export type DispatchProps<T> = React.Dispatch<Actions<T>>;
