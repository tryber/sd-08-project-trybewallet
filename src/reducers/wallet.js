const INITIAL_STATE = {
  loading: true,
  firstExpense: false,
  id: 0,
  currencies: [],
  expenses: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case 'REQUEST_DATA':
    return { ...state, loading: true };
  case 'RECEIVE_DATA':
    return { ...state,
      loading: false,
      currencies: [payload],
    };
  case 'NEW_EXPENSE':
    return { ...state,
      id: state.id + 1,
      expenses: [...state.expenses, payload],
      firstExpense: true,
    };

  default:
    return state;
  }
}
