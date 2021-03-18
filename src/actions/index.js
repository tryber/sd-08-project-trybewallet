// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE-EMAIL';
export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: { email },
});

// export const getCurrency = (currency) => (dispatch) => {
//  fetch
//  dispatch() -> escrever no state;
// }
