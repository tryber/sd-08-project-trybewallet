import { RECEIVE_CURRENCY } from '../actions/api';
import { EXPENSIVE } from '../actions/expensive';

const initialState = {
  currencies: [],
  expenses: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCY:
    return ({
      ...state,
      currencies: Object.keys(action.payload),
    });
  case EXPENSIVE:
    return ({
      ...state,
      expenses: [...state.expenses, action.value],
    });
  default: return state;
  }
};

export default reducer;
