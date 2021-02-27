import { GET_CURRENCY, REQUEST_CURRENCY, FAILED_REQUEST } from './index';

function getCurrency(json) {
  return {
    type: GET_CURRENCY,
    payload: Object.keys(json),
  };
}

function requestCurrency() {
  return { type: REQUEST_CURRENCY };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export default function fetchCurrenciesAction() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json()
        .then(
          (json) => dispatch(getCurrency(json)),
          (error) => dispatch(failedRequest(error)),
        ));
  };
}
