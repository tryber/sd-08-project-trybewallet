// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// const INITIAL_STATE = {
//     user: {
//       email: '',
//     },
//     wallet: {
//       currencies: [],
//       loading:false,
//       expenses: [],
//     },
//   };

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_LOADING':
    return {
      ...state,
      wallet: {
        loading: true,
      },
    };

  case 'REQUEST_SUCESS':
    return {
      ...state,
      loading: false,
      currencies: action.payload.data,

    };

  case 'REQUEST_FAIL':
    return {
      ...state,
      loading: false,
      error: 'Unable to find currency',
    };

  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses,
        { id: state.expenses.length, ...action.payload.expenseData }],
    };

  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.payload.delete),
    };

  default:
    return state;
  }
};

export default wallet;
