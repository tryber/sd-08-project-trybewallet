// Coloque aqui suas actions

export const SAVED_USER = 'SAVED_USER';
export const SAVED_INPUT = 'SAVED_INPUT';
export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCY_API = 'GET_CURRENCY_API';
export const FAILED_REQUEST_API = 'FAILED_REQUEST_API';
export const SAVED_CURRENCY = 'SAVED_CURRENCY';

export const savedUser = (user) => ({
  type: SAVED_USER,
  user,
});

export const savedInput = (inputData) => ({
  type: SAVED_INPUT,
  expenses: inputData,
});

export const requestCurrency = () => ({
  type: REQUEST_API,
});

export const receiveCurrency = (currencies) => ({
  type: GET_CURRENCY_API,
  payload: {
    currencies,
  },
});

export const failedRequest = (error) => ({
  type: FAILED_REQUEST_API,
  payload: {
    error,
  },
});

export const fetchCurrencies = () => (dispatch) => {
  dispatch(requestCurrency());
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((data) => data.json())
    .then(
      (json) => dispatch(receiveCurrency(json)),
    )
    .catch((error) => dispatch(failedRequest(error)));
};

// export const savedCurrency = (expenses) => (dispatch) => {
//   fetch('https://economia.awesomeapi.com.br/json/all')
//     .then((data) => data.json())
//     .then(
//       (json) => dispatch(savedInput(json)),
//     )
//     .catch((error) => dispatch(failedRequest(error)));
// };
