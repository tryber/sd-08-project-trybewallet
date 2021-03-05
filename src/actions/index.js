import { LOGIN, FETCH_CURRENCY, ADD_EXPENCIE } from '../services/consts';

export const addUser = (user) => ({
  type: LOGIN,
  email: user.email,
  password: user.password,
});

export const saveCurrency = (currencies) => ({
  type: FETCH_CURRENCY,
  payload: currencies,
});

export const addExpencie = (expencie) => ({
  type: ADD_EXPENCIE,
  payload: expencie,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const resApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resJson = await resApi.json();
    console.log('fetch currency');
    return dispatch(saveCurrency(Object.keys(resJson)));
  };
}

export function saveExpense(expense) {
  return async (dispatch) => dispatch(addExpencie(expense));
}
