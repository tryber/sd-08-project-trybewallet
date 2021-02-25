// Coloque aqui suas actions
const LOGIN = 'LOGIN';

export default function login(email) {
  return {
    type: LOGIN,
    payload: {
      email,
    },
  };
}
