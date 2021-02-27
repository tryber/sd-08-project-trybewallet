import { ADD_EXPENSES_INDEX } from './index';

export default function addExpenseIndexAction(id) {
  return {
    type: ADD_EXPENSES_INDEX,
    payload: id,
  };
}
