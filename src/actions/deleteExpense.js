import { DELETE_EXPENSE } from './index';

export default function deleteExpenseAction(newExpenses) {
  return {
    type: DELETE_EXPENSE,
    payload: newExpenses,
  };
}
