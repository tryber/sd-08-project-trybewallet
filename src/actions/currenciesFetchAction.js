import { FETCH_CURRENCIES } from './types';

function currenciesFromAPI(currencies) {
  return {
    type: FETCH_CURRENCIES,
    payload: currencies,
  };
}

function currenciesFetchAction() {
  return (dispatch) => {
    const endpoint = ('https://economia.awesomeapi.com.br/json/all');
    const currencies = fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const currenciesArray = Object.entries(data);
        const filteredCurrencies = currenciesArray.filter((item) => item[0] !== 'USDT');
        dispatch(currenciesFromAPI(filteredCurrencies));
      });
    return currencies;
  };
}

export default currenciesFetchAction;
