// Coloque aqui suas actions

export const addUser = (email, password) => (
  { type: 'ADD_USER', payload: { email, password } }
);

export const requestCurrency = () => ({
  type: 'REQUEST_API',
});

export const receiveCurrency = (currencies) => ({
  type: 'GET_CURRENCY_FROM_API',
  payload: {
    currencies,
  },
});

export const failedRequest = (error) => ({
  type: 'FAILED_REQUEST_TO_API',
  payload: {
    error,
  },
});

export const fetchCurrencies = () => (dispatch) => {
  dispatch(requestCurrency());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((data) => data.json()
      .then(
        (json) => dispatch(receiveCurrency(json)),
        (error) => dispatch(failedRequest(error)),
      ));
};

export const addWallet = (object) => ({
  type: 'ADD_TO_WALLET',
  payload: {
    object,
  },
});
