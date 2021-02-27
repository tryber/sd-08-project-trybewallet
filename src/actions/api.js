export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';

const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCY',
});

const receiveCurrencies = (json) => ({
  type: 'RECEIVE_CURRENCY',
  payload: json,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currency) => dispatch(receiveCurrencies(currency)));
  };
}
