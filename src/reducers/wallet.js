import { WALLET } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case WALLET:
    return {
      ...state, currencies: action.value,
    };
  default:
    return state;
  }
}

export default loginReducer;
