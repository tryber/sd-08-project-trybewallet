// Coloque aqui suas actions
export const reqForAddExpense = () => ({
  type: 'REQ_FOR_ADD_EXPENSE',
  isFetching: true,
});

export const reqForAddExpenseSuccess = (coins) => ({
  type: 'REQ_FOR_ADD_EXPENSE_SUCCESS',
  payload: { coins },
});

export const reqForAddExpenseError = (error) => ({
  type: 'REQ_FOR_ADD_EXPENSE_ERROR',
  error,
});

export const reqForAddExpenseThunk = (expense) => async (dispatch) => {
  dispatch(reqForAddExpense());
  try {
    const req = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coinsJson = await req.json();
    let filterCoins = [];
    Object.entries(coinsJson).forEach((coin) => {
      if (coin[0] !== 'USDT') filterCoins = [...filterCoins, coin[1]];
    });
    expense.exchangeRates = filterCoins;
    dispatch(reqForAddExpenseSuccess(expense));
  } catch (error) {
    dispatch(reqForAddExpenseError(error));
  }
};
