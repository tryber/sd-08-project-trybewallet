import { RECEIVE_COIN,
  INFO_WALLET,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  ADD_EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseEdit: {},
  editStatus: false,
};

function CoinReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_COIN:
    return { ...state, currencies: Object.keys(action.payload) };
  case INFO_WALLET:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload) };
  case EDIT_EXPENSE:
    return { ...state, expenseEdit: action.payload, editStatus: true };

  case ADD_EDIT_EXPENSE:
    return { ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id !== action.payload.id) {
          return expense;
        }
        return action.payload;
      }),
      editStatus: false,
    };
  default:
    return state;
  }
}
export default CoinReducer;
