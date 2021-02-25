// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function expensesReducerAction(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return state;
  default:
    return state;
  }
}
