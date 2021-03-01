import { EDITING_EXPENSE,
  EDITED_EXPENSE,
  SAVE_EDITED_EXPENSE }
  from '../actions';

const INITIAL_VALUE = {
  currencies: [],
  expenses: [],
};

const edit = (
  state = INITIAL_VALUE,
  { type, payload },
) => {
  switch (type) {
  case EDITING_EXPENSE:
    return {
      ...state,
      isEditing: payload.isEditing,
      editingExpense: payload.expenses,
      selectEdited: payload.selectEdited,
    };
  case EDITED_EXPENSE:
    return { ...state, selectEdited: payload.selectEdited };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      isEditing: payload.isEditing,
      selectEdited: payload.selectEdited,
      expenses: state.expenses.map((expense) => {
        if (expense.id === payload.expenses.id) {
          return { ...expense, ...payload.expenses };
        }
        return expense;
      }),
    };
  default:
    return state;
  }
};

export default edit;
