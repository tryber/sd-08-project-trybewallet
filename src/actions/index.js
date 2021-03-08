export const GET_EMAIL = 'GET_EMAIL';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  payload: email,
});

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const fetchExchangeRates = (InputFormData) => async (dispatch) => {
  const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());
  delete exchangeRates.USDT;
  dispatch(addExpense({ ...InputFormData, exchangeRates }));
};

export const DEL_EXPENSE = 'DEL_EXPENSE';

export const deleteExpense = (id) => ({
  type: DEL_EXPENSE,
  payload: id,
});
