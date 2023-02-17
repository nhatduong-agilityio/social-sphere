import { actionTypes } from '~/types/common';

// Constant fetch users.
export const FETCH_USERS: actionTypes = {
  PENDING: 'ACTION_TYPES_PENDING',
  SUCCESS: 'ACTION_TYPES_SUCCESS',
  FAILURE: 'ACTION_TYPES_FAILURE',
};

export const UPDATE_USER = {
  PENDING: 'UPDATE_PENDING',
  SUCCESS: 'UPDATE_SUCCESS',
  FAILURE: 'UPDATE_FAILURE',
};

export const DELETE_USER = {
  PENDING: 'DELETE_PENDING',
  SUCCESS: 'DELETE_SUCCESS',
  FAILURE: 'DELETE_FAILURE',
};
