// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  EXPENSES,
  CURRENCIES_INITIAL,
  CURRENCIES_SUCCESS,
  CURRENCIES_FAIL,
  ADD_EXPENSE,
  TOTAL_EXPENSES,
} from '../actions';

const initialStateWallet = {
  expenses: [],
  currencies: [],
  totalExpenses: 0,
};

function wallet(state = initialStateWallet, action) {
  switch (action.type) {
  // case USER:
  //   return { ...state, email: action.value.email, password: action.value.password };
  case EXPENSES:
    return { ...state, expenses: action.value };

  case CURRENCIES_INITIAL:
    return { ...state };

  case CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: [...Object.keys(action.currencies)],
    };

  case CURRENCIES_FAIL:
    return { ...state, error: action.error };

  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expenses] };

  case TOTAL_EXPENSES:
    return { ...state, totalExpenses: state.totalExpenses + action.value };
    // return { ...state, totalExpenses: console.log(state) };

  default:
    return state;
  }
}

export default wallet;
