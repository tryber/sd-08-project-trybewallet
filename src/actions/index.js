// Coloque aqui suas actions
export default function currentUser(user) {
  return {
    type: 'UPDATE_USER',
    payload: user,
  };
}
