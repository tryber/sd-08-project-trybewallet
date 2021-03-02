export const GET_CURRENCY = 'GET_CURRENCY';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';

const requestCurrency = () => ({
  type: GET_CURRENCY,
});

const receiveCurrency = (json) => ({
  type: RECEIVE_CURRENCY,
  payload: json,
});
export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(receiveCurrency(currencies)));
  };
}
