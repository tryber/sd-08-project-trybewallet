// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';

export function loginAction({ email }) {
  return {
    type: GET_EMAIL,
    email,
  };
}
