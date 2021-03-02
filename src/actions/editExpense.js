import { EDIT_EXPENSE } from './index';

export default function editExpenseAction(editionExp) {
  return {
    type: EDIT_EXPENSE,
    payload: editionExp,
  };
}
