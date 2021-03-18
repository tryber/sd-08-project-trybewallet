export const SAVE_EMAIL = 'SAVE_EMAIL';

export const actionCreator = {
  saveEmail: (email) => ({ type: SAVE_EMAIL, payload: email }),
};
