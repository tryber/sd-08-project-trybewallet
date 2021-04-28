// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE,
} from '../actions/wallet';
// import { initialStateWithExpenses } from '../tests/mockData';

// estado inicial dos carros que vai junto com o outro estado no objeto do estado global
const initialState = {
  currencies: [],
  expenses: [],
  exchangeRates: {},
};

// reducer que executa a action e alter de fato o estado inicial dos carros
export default function wallet(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state,
      currencies: [...action.currencies],
      exchangeRates: action.exchangeRates,
    }; // need fix
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.expense],
      exchangeRates: action.exchangeRates,
    };
  case UPDATE_EXPENSE:
    return { ...state,
      expenses: [
        ...state.expenses.slice(0, state.expenses.indexOf(action.expense)),
        ...state.expenses.slice(state.expenses.indexOf(action.expense)),
      ],
      exchangeRates: action.exchangeRates,
    };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: [
        ...state.expenses.slice(0, action.expense),
        ...state.expenses.slice(action.expense + 1),
      ],
      // exchangeRates: action.exchangeRates,
    };
  default:
    return state;
  }
}
