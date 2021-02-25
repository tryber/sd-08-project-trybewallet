export const USER_LOGIN = 'USER_LOGIN';

export const SET_CURRENCIES = 'SET_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const CREATE_EXPENSE = 'CREATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const userLoginAction = (email) => ({
  type: USER_LOGIN,
  email,
});

const requestSuccess = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});

const requestFail = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

const requestCurrencies = () => ({
  type: GET_CURRENCIES,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestCurrencies());
    const fetchedCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const jsonCurrencies = await fetchedCurrencies.json();
    const jsonKeys = Object.keys(jsonCurrencies);

    const currencies = jsonKeys
      .map((key) => ({
        currency: key,
        currencyDetails: jsonCurrencies[key],
      }))
      .filter((currency) => currency.currency !== 'USDT');

    dispatch(requestSuccess(currencies));
  } catch (error) {
    dispatch(requestFail(error));
  }
};

export const addExpense = (expense) => ({
  type: CREATE_EXPENSE,
  payload: expense,
});

export const removeExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: expenseId,
});
