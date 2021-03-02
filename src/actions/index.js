export const addEmail = (email) => ({
  type: 'EMAIL_ADD',
  payload: email,

});

const sendapi = (data) => ({
  type: 'GET_DATA',
  payload: data,
});
export const expense = (valor) => ({
  type: 'GET_EXPENSE',
  valor,
});
export const deleteExpenses = (expenseID) => ({
  type: 'DELET_EXPENSE',
  expenseID,
});
const getApi = () => async (dispatch) => {
  const getapi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const jsondata = await getapi.json();
  dispatch(sendapi(jsondata));
};

export default getApi;
