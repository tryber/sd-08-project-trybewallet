import { SAVE_CURRENCIES, SAVE_EXPENSES } from './index';

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
