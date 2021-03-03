// Coloque aqui suas actions
import { ADD_EXPENSE, LOGIN, REMOVE_EXPENSE, SAVE_CURRENCIES, SUBTRACT_FROM_TOTAL, SUM_TO_EXPENSES } from '../store/consts';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const addExpense = (expenseInfos) => ({
  type: ADD_EXPENSE,
  payload: [expenseInfos],
});

export const sumToExpensesTotal = (valueToSum) => ({
  type: SUM_TO_EXPENSES,
  payload: valueToSum,
});

export const removeExpense = (expenseId) => ({
  type: REMOVE_EXPENSE,
  payload: expenseId,
});

export const subtractFromTotal = (valueToSubtract) => ({
  type: SUBTRACT_FROM_TOTAL,
  payload: valueToSubtract,
});
