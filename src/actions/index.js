// Coloque aqui suas actions
export const DISPATCH_EMAIL = 'DISPATCH_EMAIL';
export const DISPATCH_EXPENSES = 'DISPATCH_EXPENSES';
export const DISPATCH_DELETE = 'DISPATCH_DELETE';

export const dispatchEmail = (userEmail) => ({
  type: DISPATCH_EMAIL,
  userEmail,
});

export const dispatchExpenses = (state, currency) => ({
  type: DISPATCH_EXPENSES,
  state,
  currency,
});

export const dispatchDelete = (expense) => ({
  type: DISPATCH_DELETE,
  expense,
});

export function fetchCurrency(state) {
  return (dispatch) => (
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(dispatchExpenses(state, data)))
  );
}
