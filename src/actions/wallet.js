// import fetchAPI from '../API';

// export const REQUEST_TO_API = 'REQUEST_TO_API';
// export const REQUEST_SUCESS = 'REQUEST_SUCESS';
// export const REQUEST_FAIL = 'REQUEST_FAIL';
// export const ADD_EXPENSE = 'ADD_EXPENSE';
// export const DELETE_EXPENSE = 'DELETE_EXPENSE';
// export const INIT_EDIT_EXPENSE = 'INIT_EDIT_EXPENSE';
// export const FINISH_EDIT_EXPENSE = 'FINISH_EDIT_EXPENSE';

// const requestToApi = () => ({
//   type: REQUEST_TO_API,
// });

// const requestSucess = (currencies) => ({
//   type: REQUEST_SUCESS,
//   currencies,
// });

// const requestFail = (error) => ({
//   type: REQUEST_FAIL,
//   error,
// });

// export const requestCurrencies = () => async (dispatch) => {
//   try {
//     dispatch(requestToApi());
//     const currencies = await fetchAPI();
//     dispatch(requestSucess(currencies));
//   } catch (error) {
//     dispatch(requestFail(error));
//   }
// };

// export const addExpense = (expenses) => ({
//   type: ADD_EXPENSE,
//   expenses,
// });

// export const deleteExpense = (expense) => ({
//   type: DELETE_EXPENSE,
//   expense,
// });

// export const editExpense = (expense) => ({
//   type: INIT_EDIT_EXPENSE,
//   expense,
// });

// export const endExpenseEdit = (expense) => ({
//   type: FINISH_EDIT_EXPENSE,
//   expense,
// });
