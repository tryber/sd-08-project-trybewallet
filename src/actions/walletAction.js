import { GET_CURRENCIES, REQUEST_CURRENCIES, FAILED_REQUEST } from './index';

function requestCurrencies() {
  return { type: REQUEST_CURRENCIES };
}

function getCurrencies(json) {
  return { type: GET_CURRENCIES, payload: json };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

function fetchCurrencies() {
  return async (dispatch) => {
    try {
      dispatch(requestCurrencies());
      const exchangeResponse = await fetch(
        'https://economia.awesomeapi.com.br/json/all',
      );
      const exchangeJson = await exchangeResponse.json();
      delete exchangeJson.USDT;
      return dispatch(getCurrencies(exchangeJson));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}

export default fetchCurrencies;
