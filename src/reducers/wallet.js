// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { Types } from '../actions/wallet';

const INITIAL_STATE = {
  expenses: [],
  idCounter: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Types.ADD_EXPENSE: {
    const newExpense = { id: state.idCounter, ...action.payload };
    return {
      ...state,
      expenses: [...state.expenses, newExpense],
      idCounter: state.idCounter + 1,
    };
  }
  default: return state;
  }
}
