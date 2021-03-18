// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES__SUCCESS';
export const GET_CURRENCIES_ERROR = 'GET_CURRENCIES__ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';
// export const GET_EXPENSES = 'GET_EXPENSES';

export const saveLoginInfo = (email) => ({
  type: LOGIN,
  email,
});

const getCurrencies = () => ({
  type: GET_CURRENCIES,
});

const getCurrenciesSuccess = (currencies) => ({
  type: GET_CURRENCIES_SUCCESS,
  payload: currencies,
});

const getCurrenciesError = (error) => ({
  type: GET_CURRENCIES_ERROR,
  payload: error,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(getCurrencies);
    const curr = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    const currCodes = Object.keys(curr)
      .filter((currency) => currency !== 'USDT');

    // const currencies = currCodes.map((currCode) => ({
    //   currency: currCode,
    //   currencyDetails: curr[currCode],
    // })).filter((currency) => currency.currency !== 'USDT');

    dispatch(getCurrenciesSuccess(currCodes));
  } catch (error) {
    dispatch(getCurrenciesError(error));
  }
};

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

// export const getExpenses = (expenses) => ({
//   type: GET_EXPENSES,
//   payload: expenses,
// });
