export const LOGIN_USER_EMAIL = 'LOGIN_USER_EMAIL';

export const addEmailStore = (email) => ({
  type: LOGIN_USER_EMAIL,
  email,
});
