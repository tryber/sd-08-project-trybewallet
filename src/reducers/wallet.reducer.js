// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_API } from '../common/ActionTypes';

const initialState = {
  inicio: 'wallet',
};

export default function wallet(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case SAVE_API:
    return {
      ...state,
      inicio: payload,
    };

  default:
    return state;
  }
}
