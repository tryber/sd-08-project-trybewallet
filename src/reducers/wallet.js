import { REQUEST_API,
  REQUEST_API_SUCCESS,
  SAVE_EXPENSE,
  DELETE_EXPENSE,
  EDITING_EXPENSE,
  EDITED_EXPENSE,
  SAVE_EDITED_EXPENSE }
  from '../actions';

const INITIAL_VALUE = {
  currencies: [],
  expenses: [],
};

const wallet = (
  state = INITIAL_VALUE,
  { type, payload },
) => {
  switch (type) {
  case REQUEST_API:
    return { ...state, isFetching: payload.isFetching };
  case REQUEST_API_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(payload.data).filter((elem) => elem !== 'USDT'),
      isFetching: payload.isFetching,
    };
  case SAVE_EXPENSE:
    return { ...state, expenses: [...state.expenses, payload.expenses] };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== payload.expenses.id),
      ],
    };
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
      expenses: [...state.expenses].map((expense) => {
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

export default wallet;
