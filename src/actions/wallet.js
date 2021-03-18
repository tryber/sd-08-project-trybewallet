import { SAVE_CURRENCIES, SAVE_EXPENSES, DELETE_EXPENSES } from './index';

export const actionCurrency = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: {
    currencies,
  },
});

export const actionExpense = (expenses) => ({
  type: SAVE_EXPENSES,
  payload: {
    expenses,
  },
});

export const actionDelete = (expenseId) => ({
  type: DELETE_EXPENSES,
  payload: {
    expenseId,
  },
});
