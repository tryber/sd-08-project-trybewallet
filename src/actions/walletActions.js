import getAPI from '../services/requestAPI';

import {
  USER_EMAIL,
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_DATA,
  ADD_EXPENSES,
} from './index';

export function actionUserEmail(email) {
  return {
    type: USER_EMAIL,
    email,
  };
}

export function currencies(answer) {
  return {
    type: FETCH_CURRENCIES,
    currencies: answer,
  };
}
export function actionFetchCurrencies() {
  return async (dispatch) => {
    const response = await getAPI();
    const currenciesKeys = Object.keys(response);
    const filterCurrencies = currenciesKeys.filter((
      currencyKey,
    ) => currencyKey !== 'USDT');
    dispatch(currencies(filterCurrencies));
  };
}

export function currenciesData(answer) {
  return {
    type: FETCH_CURRENCIES_DATA,
    currenciesData: answer,
  };
}
export function actionFetchCurrenciesData() {
  return async (dispatch) => {
    const CurrenciesData = await getAPI();
    console.log(CurrenciesData);
    dispatch(currenciesData(CurrenciesData));
  };
}

export function actionAddExpenses(expense) {
  return {
    type: ADD_EXPENSES,
    expense,
  };
}
