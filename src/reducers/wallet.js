// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  // total: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'UPAPI':
    return { ...state, currencies: action.value };
    // return {
    //   ...state,
    //   currencies: [...action.value],
    //   currenciesDatas: action.currenciesData,
    // };
  case 'UPEXPENSES':
    return { ...state, expenses: [...state.expenses, action.UPexpenses] };
    // return {
    //   ...state,
    //   expenses: [
    //     ...state.expenses,
    //     {
    //       id: state.expenses.length,
    //       ...action.UPexpenses,
    //       exchanageRates: state.currenciesData,
    //     },
    //   ],
    //   // total:
    //   // state.total
    //   // + Number(action.expenses.value)
    //   // * Number(state.currenciesData[action.expenses.currency].ask),

    // };
  default:
    return state;
  }
};

export default walletReducer;
