import { UPDATE_EMAIL, UPDATE_EXCHANGE, UPDATE_TAG, UPDATE_METHOD,
  UPDATE_CURRENCY, UPDATE_DESCRIPTION, UPDATE_VALUE, RESET_EXPENSE,
  ADD_EXPENSE, REMOVE_EXPENSE, UPDATE_CURRENCIES, UNRESET } from '../consts';
import { fetchData } from '../services';

export const updateEmailAction = (email) => ({ type: UPDATE_EMAIL, payload: { email } });

export const addExpenseAct = (expense) => ({ type: ADD_EXPENSE, payload: expense });
export const removeExpenseAct = (id) => ({ type: REMOVE_EXPENSE, payload: { id } });
export const updateCurrenciesAct = (currencies) => (
  { type: UPDATE_CURRENCIES, payload: { currencies } });
export const fetchThenUpCurrenciesAct = () => (dispatch) => (
  fetchData()
    .then((data) => Object.keys(data).filter((currency) => currency !== 'USDT'))
    .then((currencies) => dispatch(updateCurrenciesAct(currencies)))
);

export const updateExchangeRatesAct = (exchangeRates, id) => (
  { type: UPDATE_EXCHANGE, payload: { exchangeRates, id } });
export const updateTagAct = (tag) => ({ type: UPDATE_TAG, payload: { tag } });
export const updateValueAct = (value) => ({ type: UPDATE_VALUE, payload: { value } });
export const updateMethodAct = (method) => ({ type: UPDATE_METHOD, payload: { method } });
export const updateDescriptionAct = (description) => (
  { type: UPDATE_DESCRIPTION, payload: { description } });
export const updateCurrencyAct = (currency) => (
  { type: UPDATE_CURRENCY, payload: { currency } });
export const resetExpense = () => ({ type: RESET_EXPENSE });
export const unreset = () => ({ type: UNRESET });

export const fetchThenUpExchangeAct = (id) => (dispatch, getState) => (fetchData()
  .then((data) => dispatch(updateExchangeRatesAct(data, id)))
  .then(() => dispatch(addExpenseAct(getState().expense)))
  .then(() => dispatch(resetExpense()))
  .then(() => dispatch(unreset()))
);

export const chooseWalletInputAct = (name, value) => {
  switch (name) {
  case 'tag-input':
    return updateTagAct(value);
  case 'method-input':
    return updateMethodAct(value);
  case 'currency-input':
    return updateCurrencyAct(value);
  default:
    return undefined;
  }
};
