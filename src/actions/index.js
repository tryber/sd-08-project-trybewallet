export const USER_EMAIL = 'USER_EMAIL';
export const getUserEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});
