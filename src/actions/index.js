// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';
export const CURRENCY_TOTAL = 'CURRENCY_TOTAL';

export function loginAction({ email }) {
  return {
    type: GET_EMAIL,
    email,
  };
}

export function walletAction(currencyTotal) {
  return {
    type: CURRENCY_TOTAL,
    currencyTotal,
  };
}
