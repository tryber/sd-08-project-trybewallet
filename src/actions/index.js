export const LOGIN_USER = 'LOGIN_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const login = {
  loginUser: (email) => (
    { type: LOGIN_USER, payload: email }
  ),
};

export const addExpense = (payload) => (
  { type: ADD_EXPENSE, payload }
);

export async function requestCurrencies() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
