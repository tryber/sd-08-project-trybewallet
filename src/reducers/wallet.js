// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  isFetching: false,
  totalValue: 0,
};

const updateTotal = (state, action) => {
  let expenses = [];
  if (action.type === 'UPDATE_EXPENSE') {
    expenses = action.expenses;
  } else {
    expenses = state.expenses.concat(action.expense);
  }
  const total = expenses.reduce((acc, expense) => (
    parseFloat(
      (acc + expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2),
    )
  ), 0);
  return total;
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return {
      ...state,
      isFetching: true,
    };
  case 'GET_API':
    return {
      ...state,
      isFetching: false,
      currencies: action.payload,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      totalValue: updateTotal(state, action),
    };
  case 'UPDATE_EXPENSE':
    return {
      ...state,
      expenses: action.expenses,
      totalValue: updateTotal(state, action),
    };
  default: return {
    ...state,
  };
  }
};

export default wallet;
