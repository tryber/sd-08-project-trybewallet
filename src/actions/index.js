// Coloque aqui suas actions
export const userEmailAction = (value) => ({
  type: 'LOGIN_EMAIL',
  value,
});

export const userPasswordAction = (value) => ({
  type: 'LOGIN_PASSWORD',
  value,
});

export const userCurrenciesAction = (value) => ({
  type: 'USER_CURRENCIES',
  value,
});

export const userExpensesAction = (value) => ({
  type: 'USER_EXPENSES',
  value,
});
