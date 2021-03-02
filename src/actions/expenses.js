export const EXPENSES = 'EXPENSES';

export const currentExpense = (value) => ({
  type: EXPENSES,
  payload: value,
});
