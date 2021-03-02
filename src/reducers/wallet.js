import {
  ADD_DESPESA,
  EDIT_DESPESA,
  DELETE_DESPESA,
  UPDATE_COIN,
  BT_BOOL,
  SAVE_COINS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  btBool: false,
  id: 0,
  editExpenses: {},
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_DESPESA:
    return {
      ...state,
      expenses: [
        ...state.expenses, {
          ...action.payload,
          id: state.expenses.length,
          exchangeRates: state.currencies,
        },
      ],
    };
  case EDIT_DESPESA:
    return (
      {
        ...state,
        expenses: action.expenses,
      }
    );
  case UPDATE_COIN:
    return ({ ...state, currencies: action.exchangeRates });
  case DELETE_DESPESA:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    });
  case BT_BOOL:
    return (
      {
        ...state,
        isEditing: action.change,
      });
  case SAVE_COINS:
    return ({ ...state, currencies: action.payload });
  default:
    return state;
  }
}

export default wallet;
