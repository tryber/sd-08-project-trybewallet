// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_REGISTER, DELETE_REGISTER, REQUEST_API,
  REQUEST_API_SUCCESS, REQUEST_API_ERRO } from '../store/consts';

const initialState = {
  currencies: [],
  expenses: [],
  exchangeRates: [],
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case ADD_REGISTER:
    return { ...state,
      expenses: [...state.expenses, action.payload] };
  case DELETE_REGISTER:
    return state.filter((register) => register !== action.value);
  case REQUEST_API:
    return {
      ...state,
      isFetching: action.payload.isFetching,
    };
  case REQUEST_API_SUCCESS:
    // console.log(action.payload);
    return {
      ...state,
      // currencies: action.payload.map((e) => e.key),
      exchangeRates: [...state.exchangeRates, action.payload],
      // exchangeRates: action.payload,
      // isFetching: action.payload.isFetching,

    };
  case REQUEST_API_ERRO:
    return {
      ...state,
      error: action.payload.error,
      isFetching: action.payload.isFetching,
    };
  default:
    return state;
  }
};

export default wallet;
