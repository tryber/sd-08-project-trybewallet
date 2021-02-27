// Coloque aqui suas actions
const USER_LOGIN = 'USER_LOGIN';
export default function userLogin(email) {
  return (
    { type: USER_LOGIN,
      payload: email,
    }
  );
}
