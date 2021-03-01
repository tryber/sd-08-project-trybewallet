// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  GET_EXPENSES,
  TOTAL_EXPENSES,
} from '../actions/constants';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.Currencies };
  case GET_EXPENSES:
    // console.log(action.payload)
    console.log(Object.entries(action.get_Expenses).map((item) => item[0]));
    return { ...state, expenses: [...state.expenses, action.get_Expenses] };
    // return {...state, expenses: ...state.expenses,{value: action.get_Expenses.value,
    //    currency: action.get_Expenses.coin,
    //   method: action.get_Expenses.method,
    //   tag: action.get_Expenses.tag,
    //   description: action.get_Expenses.description},

    //   ]}
  case TOTAL_EXPENSES:
    return { ...state, total: state.total + action.totalExpenses };
  default:
    return state;
  }
}
