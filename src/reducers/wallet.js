// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FET_API } from '../actions';

const INITIAL_STATE = { currency: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FET_API:
    return { ...state, currency: Object.keys(action.payload) };
  default:
    return state;
  }
};
