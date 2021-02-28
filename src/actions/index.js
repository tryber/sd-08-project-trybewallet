// Coloque aqui suas actions
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const ADD_CURRENCIES_ON_STATE = 'ADD_CURRENCIES_ON_STATE';
export const ADD_EXPENSE_ON_STATE = 'ADD_EXPENSE_ON_STATE';
export const UPDATE_TOTAL_EXPENSES = 'UPDATE_TOTAL_EXPENSES';

export const userLoginSuccessAction = (item) => ({
  type: USER_LOGIN_SUCCESS,
  payload: item,
});

export const addCurrenciesAction = (currencies) => ({
  type: ADD_CURRENCIES_ON_STATE,
  payload: currencies,
});

export const addExpenseAction = (expense) => ({
  type: ADD_EXPENSE_ON_STATE,
  payload: expense,
});

export const updateTotalExpensesAction = (value) => ({
  type: UPDATE_TOTAL_EXPENSES,
  payload: value,
});

// export default (item) => ({
//   type: USER_LOGIN_SUCCESS,
//   payload: item,
// });
