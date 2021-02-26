// import * as ActionTypes from '../common/ActionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
export default function reducer(state = INITIAL_STATE, action) {
  const { type } = action;
  switch (type) {
  case 'DEBUG':
    return { ...state };

  default:
    return state;
  }
}
