import { ADD_EXPENSES_INDEX } from './index';

export default function addExpensesIndexAction(newExpenseId) {
  return {
    type: ADD_EXPENSES_INDEX,
    payload: { id: newExpenseId },
  };
}
