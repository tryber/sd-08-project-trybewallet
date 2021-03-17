import types from './types';

function editExpenseAction(id) {
  return {
    type: types.EDIT_EXPENSE,
    payload: id,
  };
}

export default editExpenseAction;
