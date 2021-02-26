export const saveEmail = (email) => ({ type: 'SAVE_EMAIL', email });

async function fetchCurrencyExchange() {
  const API = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencyExchange = await API.json();
  return currencyExchange;
}

export const requestCurrencyExchange = (currency) => (
  { type: 'REQUEST_CURRENCY', currency });

export const failedRequest = (error) => ({ type: 'FAILE_REQUEST', error });

export const saveCurrencyExchange = () => async (dispatch) => {
  const currencies = await fetchCurrencyExchange();
  dispatch(requestCurrencyExchange(currencies));
};

export const addExpense = (expense) => async (dispatch) => {
  const currencies = await fetchCurrencyExchange();
  dispatch({
    type: 'ADD_EXPENSE',
    expense: {
      ...expense,
      exchangeRate: currencies,
    },
  });
};
