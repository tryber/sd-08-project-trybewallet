export const GET_EMAIL = 'GET_EMAIL';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  payload: email,
});
