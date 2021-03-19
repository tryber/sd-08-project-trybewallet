export const LOGIN = {
  SAVE_EMAIL: 'SAVE_EMAIL',
};

export const login = {
  saveEmail: (email) => ({ type: LOGIN.SAVE_EMAIL, payload: email }),
};
