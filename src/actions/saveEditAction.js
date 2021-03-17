import types from './types';

function saveEditAction(expense) {
  return {
    type: types.SAVE_EXPENSE,
    payload: expense,
  };
}

export default saveEditAction;
