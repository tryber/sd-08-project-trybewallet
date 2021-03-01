import { RESET_EXPENSE, UNRESET } from '../consts';

const initialState = {
  walletForm: false,
};

const reset = (state = initialState, { type }) => {
  switch (type) {
  case RESET_EXPENSE:
    return { ...state, ...{ walletForm: true } };
  case UNRESET:
    return { ...state, ...{ walletForm: false } };
  default:
    return state;
  }
};

export default reset;
