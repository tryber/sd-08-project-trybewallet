import { ADD_DESPESA, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  contador: 0,
};

export default function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_DESPESA: {
    return {
      ...state,
      expenses: [...state.expenses, { id: state.contador, ...action.payload }],
      contador: state.contador + 1,
    };
  }
  case DELETE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((despesa) => despesa.id !== action.id),
    };
  }
  default:
    return state;
  }
}
