// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// const save = '(Number(action.payload.value)) * (Number(action.payload.exchangeRates[action.payload.currency].ask)) + state.total';
const DEFAULT_STATE = { currencies: ['BRL'],
  expenses: [],
  total: 0,
  apiResponse: ['BRL'],
  fetched: false,
  id: 0,
  latesteCurrency: '',
  cashList: [],
  edit: {
    value: 0,
    currency: '',
    method: '',
    tag: '',
    description: '',

  },
  actualyEdited: false,
  edited: false };
const wallet = (state = DEFAULT_STATE, action) => {
  const totalll = state.expenses
    .reduce((a, b) => (a + b.exchangeRates[b.currency].ask * b.value), 0);
  console.log(totalll);
  switch (action.type) {
  case 'FETCH_REQUEST_SUCESS':
    return {
      ...state, currencies: action.payload,
    };
  case 'Item':
    return {
      ...state,
      // total: totalll,
      total: Number(action.payload.value)
      * Number(action.payload.exchangeRates[action.payload.currency].ask) + state.total,
      expenses: [...state.expenses, action.payload],
    };
  case 'DELETE_ITEM':
    return {
      ...state,
      total: (totalll - action.sub),
      expenses: [...state.expenses.filter((element) => action.payload !== element.id)],
    };
  case 'EDIT':
    return {
      ...state, actualyEdited: true, edit: { ...action.payload },
    };
  case 'DES_FORM':
    return {
      // ...state, edit: state.expenses.filter((element) => element.id === action.payload),
      ...state, edited: true,

    };
  case 'superedited':
    return {
      ...state,
      expenses: [...state.expenses.map((element) => {
        if (element.id === action.payload.id) return action.payload;
        return element;
      })],
    };
  default:
    return state;
  }
};

export default wallet;
