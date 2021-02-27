import { ADD_EXPENSES } from './index';

export default function addExpensesAction(handlingInputs) {
  return {
    type: ADD_EXPENSES,
    payload: handlingInputs[0],
  };
}
