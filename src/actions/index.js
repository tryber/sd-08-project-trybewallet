export const LOGIN_USER = 'LOGIN_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const login = {
  loginUser: (email) => (
    { type: LOGIN_USER, payload: email }
  ),
};

export const addExpenses = {
  addExpenses: (payload) => (
    { type: ADD_EXPENSE, payload }
  ),
};

export async function requestCurrencies() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    const currencies = Object.keys(json).filter((item) => item !== 'USDT');
    return (currencies);
  } catch (error) {
    console.log(error);
  }
}
