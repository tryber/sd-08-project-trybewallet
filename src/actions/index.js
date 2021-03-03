import { LOGIN } from './actionsType';

// Coloque aqui suas actions
const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export default loginAction;
