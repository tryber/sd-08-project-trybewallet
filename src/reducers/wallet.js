// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { TYPES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  totalSpend: 0,
  id: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TYPES.GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
      isFetching: false,
    };
  case TYPES.GET_EXCHANGE_RATE:
    return {
      ...state,
      expenses: [action.payload],
    };
  case TYPES.REQ_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case TYPES.ERROR_FETCHING_API:
    return {
      ...state,
      isFetching: false,
      error: action.payload,
    };
  case TYPES.NEW_EXPENSE: {
    const newExpanse = {
      id: state.id,
      ...action.payload,
    };
    return {
      ...state,
      expenses: [...state.expenses, newExpanse],
      id: state.id + 1,
      totalSpend: Number(state.totalSpend) + Number(action.payload.value),
    };
  }
  default:
    return state;
  }
};

export default wallet;
