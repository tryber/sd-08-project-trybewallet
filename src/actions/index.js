// Coloque aqui suas actions
const loginAction = (email) => ({
  type: 'LOGIN',
  email,
});

const requestAPI = () => ({
  type: 'REQUEST_API',
});

const getAPI = (data) => ({
  type: 'GET_API',
  payload: data,
});

const fetchAPI = () => (
  async (dispatch) => {
    dispatch(requestAPI());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const arrayData = Object.values(data);
    const arrayDataFiltered = arrayData.filter((currency) => currency.codein !== 'BRLT');
    dispatch(getAPI(arrayDataFiltered));
  }
);

const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

const updateExpense = (expenses) => ({
  type: 'UPDATE_EXPENSE',
  expenses,
});

export { loginAction, fetchAPI, addExpense, updateExpense };
