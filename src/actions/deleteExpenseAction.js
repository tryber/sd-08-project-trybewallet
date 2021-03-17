import types from './types';

function deleteExpenseAction(id) {
  return {
    type: types.DELETE_EXPENSE,
    payload: id,
  };
}

export default deleteExpenseAction;
