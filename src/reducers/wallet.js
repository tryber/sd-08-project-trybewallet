// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL = {
  currencies: [],
  expenses: [],
};

const reducer = (state = INITIAL, action) => {
  switch (action.type) {
  case '':
    return state;
  default:
    return state;
  }
};

export default reducer;
