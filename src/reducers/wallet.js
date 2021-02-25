// import { LOGIN } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case 'register':
    return {

    };
  default:
    return state;
  }
}
