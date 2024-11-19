export type ActionState<T> = {
  data?: T;
  message?: string | null;
  error?: string | null;
};
