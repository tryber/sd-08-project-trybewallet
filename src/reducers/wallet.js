const initialState = {
  currencies: [],
  expenses: [],
};

const wallet = (state = initialState, { type, payload }) => {
  switch (type) {
  case '123IL':
    return { ...state, ...payload };
  default:
    return state;
  }
};

export default wallet;
