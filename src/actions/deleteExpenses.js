const DELETE_EXPENSES = 'DELETE_EXPENSES';

export default function deleteExpenses(id) {
  return { type: DELETE_EXPENSES, payload: id };
}
