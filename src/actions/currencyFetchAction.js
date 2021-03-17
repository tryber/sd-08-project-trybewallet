import types from './types';

function fetchCurrencies(currenciesData) {
  return {
    type: types.FETCH_CURRENCIES,
    payload: currenciesData,
  };
}

function currencyFetchAction() {
  return (dispatch) => {
    const url = ('https://economia.awesomeapi.com.br/json/all');
    const currencies = fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const currenciesArray = Object.keys(data)
          .filter((currency) => currency !== 'USDT');
        dispatch(fetchCurrencies(currenciesArray));
      });
    return currencies;
  };
}

export default currencyFetchAction;
