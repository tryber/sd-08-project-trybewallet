// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const saveLoginInfo = ({ email }) => ({
  type: LOGIN,
  payload: { user: { email } },
});
