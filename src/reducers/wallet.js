import { ADD_EXPENSE, GET_CURRENCIES } from '../actions';

const initialState = {
  count: 0,
  currencies: [],
  expenses: [],
  coins: {
    cambio: 'BRL',
    total: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state, expenses: [...state.expenses, { id: state.count + 1, ...action.payload }],
    };
  case GET_CURRENCIES:
    return {

    };
  default:
    return state;
  }
}
