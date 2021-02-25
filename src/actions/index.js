// Coloque aqui suas actions

import { LOGIN } from '../store/consts';

const loginAction = (email) => ({
  type: LOGIN,
  payload: email,
});

export default loginAction;
