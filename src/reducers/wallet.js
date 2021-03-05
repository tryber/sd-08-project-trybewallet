const INITIAL_STATE = ({
  currencies: [],
  expenses: [],
  idAcc: 0,
});

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER_CURRENCIES':
    return { ...state, currencies: action.value };
  case 'ADD_EXPENSE': {
    const addExpense = {
      id: state.idAcc,
      ...action.value,
    };
    return { ...state,
      expenses: [...state.expenses, addExpense],
      idAcc: state.idAcc + 1 };
  }
  default:
    return state;
  }
};

export default wallet;
