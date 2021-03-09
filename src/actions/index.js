// Coloque aqui suas actions
export const REQ_FOR_ADD_EXPENSE = 'REQ_FOR_ADD_EXPENSE';
export const REQ_FOR_ADD_EXPENSE_SUCCESS = 'REQ_FOR_ADD_EXPENSE_SUCCESS';
export const REQ_FOR_ADD_EXPENSE_ERROR = 'REQ_FOR_ADD_EXPENSE_ERROR';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const CHANGE_EDIT_STATUS = 'CHANGE_EDIT_STATUS';

export const changeEditStatus = (id, isEditing) => ({
  type: CHANGE_EDIT_STATUS,
  payload: {
    isEditing,
    id,
  },
});

export const updateExpense = (expenses) => ({
  type: UPDATE_EXPENSE,
  payload: {
    expenses,
  },
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  payload: expense,
});

export const reqForAddExpense = () => ({
  type: REQ_FOR_ADD_EXPENSE,
  isFetching: true,
});

export const reqForAddExpenseSuccess = (coins) => ({
  type: REQ_FOR_ADD_EXPENSE_SUCCESS,
  payload: { coins },
});

export const reqForAddExpenseError = (error) => ({
  type: REQ_FOR_ADD_EXPENSE_ERROR,
  error,
});

export const reqForAddExpenseThunk = (expense) => async (dispatch) => {
  dispatch(reqForAddExpense());
  try {
    const req = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coinsJson = await req.json();
    // let filterCoins = {};
    // let filterCoins = [];
    // Object.entries(coinsJson).forEach((coin) => {
    //   // if (coin[0] !== 'USDT') filterCoins = [...filterCoins, coin[1]];
    //   if (coin[0] !== 'USDT') {
    //     filterCoins = { ...filterCoins, [coin[0]]: coin[1] };
    //   }
    // });
    expense.exchangeRates = coinsJson;
    dispatch(reqForAddExpenseSuccess(expense));
  } catch (error) {
    dispatch(reqForAddExpenseError(error));
  }
};
