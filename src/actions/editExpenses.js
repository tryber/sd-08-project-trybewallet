const EDIT_EXPENSE = 'EDIT_EXPENSE';
const EDIT_EXPENSE_END = 'EDIT_EXPENSE_END';

export function editExpenses(id) {
  return { type: EDIT_EXPENSE, payload: id };
}

export function editExpensesEnd(expense) {
  return { type: EDIT_EXPENSE_END, expense };
}
