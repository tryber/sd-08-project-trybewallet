import { LOGIN } from '../store/consts';

const logar = (email) => ({
  type: LOGIN,
  payload: email,
});

export default logar;
