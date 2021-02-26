// Coloque aqui suas actions
const LOGIN = 'LOGIN';

const login = (data) => ({
  type: LOGIN,
  payload: { data },
});

export { LOGIN, login };
