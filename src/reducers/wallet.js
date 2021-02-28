// Esse reducer será responsável por tratar todas as informações relacionadas as despesas

import { WALLET } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET:
    return ({
      ...state,
      expenses: action.value,
    });
  default:
    return state;
  }
};

export default walletReducer;
