// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL = {
  currencies: {},
  expenses: [],
};

const reducer = (state = INITIAL, action) => {
  switch (action.type) {
  case 'RECEIVE_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'ADD_AN_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.concat(action.newExpense),
    };
  default:
    return state;
  }
};

export default reducer;
