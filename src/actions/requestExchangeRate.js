import { GET_EXCHANGE_RATES, FAILED_REQUEST } from './index';

function getExchangeRates(json) {
  return {
    type: GET_EXCHANGE_RATES,
    payload: json,
  };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export default function fetchExchangeRatesAction() {
  return (dispatch) => {
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json()
        .then(
          (json) => dispatch(getExchangeRates(json)),
          (error) => dispatch(failedRequest(error)),
        ));
  };
}
