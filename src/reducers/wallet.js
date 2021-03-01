const initialState = {
  currencies: [],
  expenses: [],
  expending: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'REQUEST_COINS':
    return {
      ...state,
    };
  case 'RECIEVE_COINS':
    return {
      ...state,
      currencies: action.value,
    };
  case 'UPDATES_EXPENDING':
    return {
      ...state,
      expending: action.value,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.concat(action.value),
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: action.value,
    };
  default:
    return state;
  }
};

export default wallet;
