import currenciesApi from '../services';

export const GET_EMAIL = 'GET_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENDITURE = 'SAVE_EXPENDITURE';

export function loginAction({ email }) {
  return { type: GET_EMAIL, email };
}

function saveExpenditure(expenditure) {
  return { type: SAVE_EXPENDITURE, expenditure };
}

export function getCoin(currencies) {
  return async (dispatch) => {
    const exchangeRates = await currenciesApi();
    delete exchangeRates.USDT;
    dispatch(saveExpenditure({ ...currencies, exchangeRates }));
  };
}

function getCurrencies(json) {
  return { type: GET_CURRENCIES, currencies: json };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    const currencies = await currenciesApi();
    delete currencies.USDT;
    const result = Object.values(currencies).map(({ code }) => code);
    dispatch(getCurrencies(result));
  };
}
