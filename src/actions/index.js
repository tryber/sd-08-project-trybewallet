export const LOGIN = 'LOGIN';
export const EXPENSES = 'EXPENSES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';

export const loginAction = (email) => ({ type: LOGIN, email });
export const expensesAction = (expenses) => ({ type: EXPENSES, expenses });

const requestCurrencies = () => ({ type: REQUEST_CURRENCIES });
const requestSuccess = (currencies) => (
  { type: REQUEST_SUCCESS, currencies }
);
const requestFail = (error) => (
  { type: REQUEST_FAIL, error }
);

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await request.json();
    dispatch(requestSuccess(json));
  } catch (error) {
    dispatch(requestFail(error));
  }
};
