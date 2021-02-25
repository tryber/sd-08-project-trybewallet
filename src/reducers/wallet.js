// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  isFetching: false,
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
    };
  default: return {
    ...state,
  };
  }
};

export default wallet;
