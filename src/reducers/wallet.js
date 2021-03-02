// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_VALUE = {
  currencies: [],
  expenses: [],
  total: 0,
  isFetching: false,
};
const walletReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return state;
  case 'GET_DATA':
    return { ...state, currencies: Object.keys(action.payload) };
  case 'GET_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.valor] };
  case 'DELET_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expenseID),
    };

  default:
    return state;
  }
};

export default walletReducer;
