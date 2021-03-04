import { LOGIN_USER, ADD_EXPENSE, SAVE_FETCH_CURRENCIES } from './ActionTypes';
import fetchAPI from '../services/fetchAPI';

export const loginUserAction = (email) => ({
  type: LOGIN_USER,
  payload: { email } });

export const addExpenseAction = (objetctExpenses) => ({
  type: ADD_EXPENSE,
  payload: { objetctExpenses } });

export const fetchCurrenciesAction = (dataCurrencies) => ({
  type: SAVE_FETCH_CURRENCIES,
  payload: dataCurrencies });

// export const data = () => async (dispatch) => {
//   const currencies = await fetchAPI();
//   return dispatch(fetchCurrenciesAction(currencies));
// };
