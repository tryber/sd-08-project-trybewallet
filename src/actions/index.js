export const userLoginFunction = (email) => ({
  type: 'LOGIN_SUCCESSFUL',
  payload: {
    email,
  },
});

// const exchangeRequestAPI = () => ({
//   type: 'EXCHANGE_REQUEST_API',
// });

const exchangeRequestAPISuccessful = (currencies) => ({
  type: 'EXCHANGE_REQUEST_API_SUCCESSFUL',
  payload: {
    currencies,
  },
});

const exchangeRequestAPIFailed = (error) => ({
  type: 'EXCHANGE_REQUEST_API_FAILED',
  payload: {
    error,
  },
});

export const exchangeFetchingAPI = () => async (dispatch) => {
  try {
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const jsonAPI = await fetchAPI.json();
    const arrayAPI = Object.values(jsonAPI);
    const newarray = arrayAPI.filter((currency) => currency.codein === 'BRL');
    const mapArray = newarray.map((currencies) => currencies.code);
    dispatch(exchangeRequestAPISuccessful(mapArray));
  } catch (error) {
    dispatch(exchangeRequestAPIFailed('ERROR REQUEST API'));
  }
};

const expensesCoin = (order, exchangeRates) => ({
  type: 'EXPENSES',
  payload: {
    ...order,
    exchangeRates,
  },
});

export const expensesObject = (order) => async (dispatch) => {
  try {
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const jsonAPI = await fetchAPI.json();
    delete jsonAPI.USDT;
    dispatch(expensesCoin(order, jsonAPI));
  } catch (error) {
    dispatch(exchangeRequestAPIFailed('ERROR REQUEST API'));
  }
};

export const deleteOrder = (id) => ({
  type: 'DELETE',
  payload: {
    id,
  },
});

export const EditOrder = () => ({
  type: 'EDIT',
});

export const edit = (state) => ({
  type: 'EDIT_BUTTON',
  payload: {
    state,
  },
});
