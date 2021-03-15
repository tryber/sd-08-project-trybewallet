const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
const GET_CURRENCIES = 'GET_CURRENCIES';
const GET_EXPENSES = 'GET_EXPENSES';
const GET_CURRENCY = 'GET_CURRENCY';

export function getExpenses(expenses) {
  return { type: GET_EXPENSES, payload: expenses };
}

function getCurrencies(json) {
  return { type: GET_CURRENCIES, payload: json };
}

function getCurrency(json) {
  return { type: GET_CURRENCY, payload: json };
}

function requestCurrencies() {
  return { type: REQUEST_CURRENCIES };
}

export function fetchCurrency() {
  return async (dispatch) => {
    dispatch(requestCurrencies());

    const currenciesResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currenciesJson = await currenciesResponse.json();
    delete currenciesJson.USDT;

    return dispatch(getCurrency(currenciesJson));
  };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());

    const currenciesResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currenciesJson = await currenciesResponse.json();
    delete currenciesJson.USDT;
    const currencies = Object.keys(currenciesJson);

    return dispatch(getCurrencies(currencies));
  };
}
