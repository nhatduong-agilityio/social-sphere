export type IStates<T> = {
  data?: T[];
};

export type PayloadProps<T> = {
  response?: T[];
  error?: Error | unknown;
  id?: number;
};

export type DispatchProps<T> = React.Dispatch<{
  type: string;
  payload?: PayloadProps<T>;
}>;

export type actionTypes = {
  PENDING: 'ACTION_TYPES_PENDING';
  SUCCESS: 'ACTION_TYPES_SUCCESS';
  FAILURE: 'ACTION_TYPES_FAILURE';
};
