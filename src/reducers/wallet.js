// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import USER_LOGIN from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, email: action.payload.email };
  default:
    return state;
  }
};

export default walletReducer;
