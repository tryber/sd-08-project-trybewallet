const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';
const SAVE_USER_PASSWORD = 'SAVE_USER_PASSWORD';

const addUserEmail = (payload) => ({
  type: SAVE_USER_EMAIL,
  payload,
});

const addUserPassword = (payload) => ({
  type: SAVE_USER_PASSWORD,
  payload,
});

export { addUserEmail, addUserPassword, SAVE_USER_EMAIL, SAVE_USER_PASSWORD };
