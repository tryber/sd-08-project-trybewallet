export const LOGIN_USER = 'LOGIN_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const login = {
  loginUser: (email) => (
    { type: LOGIN_USER, payload: email }
  ),
};

export const addExpense = (payload) => (
  { type: ADD_EXPENSE, payload }
);

export const removeExpense = (id) => (
  { type: REMOVE_EXPENSE, payload: id }
);

export const fetchCurrencies = (currencie) => ({
  type: FETCH_CURRENCIES,
  payload: currencie,
});

export async function requestCurrencies() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
