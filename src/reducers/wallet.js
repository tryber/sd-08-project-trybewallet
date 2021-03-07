import types from '../actions/types';

const WALLET_INITIAL_VALUE = {
  currenciesJson: {},
  currencies: [],
  currenciesList: [],
  expenses: [],
  isFetching: false,
  error: '',
};

const wallet = (state = WALLET_INITIAL_VALUE, action) => {
  switch (action.type) {
  case types.CURRENCIES_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case types.CURRENCIES_REQUEST_FAILED:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case types.CURRENCIES_REQUEST_SUCCEED:
    return {
      ...state,
      currenciesJson: action.currenciesJson,
      currencies: action.currencies,
      currenciesList: action.currenciesList,
      isFetching: false,
    };
  case types.UPDATE_EXPENSES_DATA:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
