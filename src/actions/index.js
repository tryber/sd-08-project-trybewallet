import * as actionTypes from '../common/actionTypes';

export const updateEmail = (value) => ({
  type: actionTypes.SET_EMAIL,
  payload: value,
});

export const updatePassword = (value) => ({
  type: actionTypes.SET_PASSWORD,
  payload: value,
});

export const saveEmail = (value) => ({
  type: actionTypes.SAVE_EMAIL,
  payload: value,
});
